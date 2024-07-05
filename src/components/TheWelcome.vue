<script>
import {
  ElTable,
  ElTableColumn,
  ElPagination,
} from 'element-plus';

import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Api = 'https://topup3000.mitwit-cre.com.tw';

export default {
  data() {
    return {
      plate: '',
      isLoading: true,
      transactions: [],
      currentPage: 1,
      pageSize: 10,
      startDate: '',
      endDate: '',
      searchData: {
        plate: '',
        startDate: '',
        endDate: '',
      },
    }
  },
  methods: {
    handleDateChange(date) {
      this.startDate = date[0];
      this.endDate = date[1];
      this.showCalendar = false;
    },
    exportExcel() {
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(document.querySelector('#transactionsTable'), xlsxParam);

      // 獲取工作表
      let ws = wb.Sheets[wb.SheetNames[0]];

      // 設置儲存格格式
      let range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          let cell_address = { c: C, r: R };
          let cell_ref = XLSX.utils.encode_cell(cell_address);
            
          if (!ws[cell_ref]) continue;
          if (!ws[cell_ref].s) ws[cell_ref].s = {};
          ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
        }
      }
      // 設置欄位寬度
      let colWidths = [];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        let maxWidth = 14;
         for (let R = range.s.r; R <= range.e.r; ++R) {
          let cell_address = { c: C, r: R };
          let cell_ref = XLSX.utils.encode_cell(cell_address);
          let cell = ws[cell_ref];
          if (!cell || !cell.v) continue;
          let cellValue = cell.v.toString();
          maxWidth = Math.max(maxWidth, cellValue.length);
        }
        colWidths.push({ wch: maxWidth });
      }
      ws['!cols'] = colWidths;
      // 將工作簿寫出
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `儲值扣抵明細.xlsx`);
      } catch (e) {
        if (console) {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
    getMidnC() {
      this.mid = this.$route.query.mid;
      this.c = this.$route.query.c;
    },
    getDetails() {
      this.getMidnC();
      this.isLoading = true;
      this.plate = atob(sessionStorage.getItem('plate'));
      const getDetailsApi = `${Api}/main/detail/${this.mid}&${this.c}`;
      this.$http
        .post(getDetailsApi, { plate: this.plate })
        .then((response) => {
          this.transactions = response.data.CHARGE_RECORD;
          this.isLoading = false;
        })
    },
    // 數字千分位格式
    amountFormatter(row, column, cellValue) {
      if (cellValue === undefined || cellValue === null) {
        return '';
      }
      cellValue += '';
      if (!cellValue.includes('.')) cellValue += '.';
      return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
      }).replace(/\.$/, '');
    },
    search() {
      this.isLoading = true;
      const searchApi = `${Api}/main/search/${this.mid}&${this.c}`;
      this.searchData = { plate: this.plate, startDate: this.startDate, endDate: this.endDate };
      if (this.startDate == '' || this.endDate == '') {
        alert('區間不得為空，請重新選擇日期區間搜尋');
        this.isLoading = false;
      } else if (this.startDate > this.endDate) {
        alert('起始日不可晚於截止日，請重新選擇日期區間搜尋');
        this.isLoading = false;
      } else {
        this.$http
          .post(searchApi, this.searchData)
          .then((response) => {
            this.transactions = response.data.CHARGE_RECORD;
            this.isLoading = false;
          })
      }
    },
    // 清除搜尋結果
    clear() {
      this.startDate = "";
      this.endDate = "";
      this.getDetails();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.getDetails()
  },
  computed: {
    pageCount() {
      return Math.ceil(this.transactions.length / this.pageSize);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.transactions.slice(start, end);
    },
    // 搜尋區間最大為今日起往前推算三個月
    currentDate() {
      const today = new Date();
      return today.toISOString().slice(0, 10);
    },
    maxSearchFromDate() {
      const today = new Date();
      const maxDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      return maxDate.toISOString().slice(0, 10);
    },
  },
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
  },
}
</script>

<template>
  <div class="header w-100">
    <p class="text-center text-white fs-3 bg-primary py-3">
      儲值扣抵明細
    </p>
  </div>
  <div v-if="isLoading" class="d-flex flex-column align-items-center">
    <div>
      <img src="../assets/loading.svg" alt="loading">
    </div>
    <div>努力加載中，請稍候...</div>
  </div>
  <div v-if="!isLoading" class="content mt-3 md">
    <section>
      <span class="me-3">請選擇區間搜尋</span>
      <input type="date" class="pe-3 me-2" v-model="startDate" :min="maxSearchFromDate" :max="currentDate">
      <span>～ </span>
      <input type="date" class="pe-3 me-2 my-1" v-model="endDate" :min="maxSearchFromDate" :max="currentDate">
      <button class="btn btn-primary text-white" @click="search">搜尋</button>
      <button class="btn btn-outline-primary" style="margin-left: 10px;" @click="clear">清除搜尋結果</button>
    </section>
    <section>
      <button class="btn btn-primary text-white" @click="exportExcel">匯出</button>
    </section>
  </div>
  <div v-if="!isLoading" class="content mt-3 sm">
    <section class="d-flex justify-content-center">
      <input type="date" class="pe-3 me-2" v-model="startDate" :min="maxSearchFromDate" :max="currentDate">
      <span>～ </span>
      <input type="date" class="pe-3 me-2" v-model="endDate" :min="maxSearchFromDate" :max="currentDate">
    </section>
    <section class="mt-2 d-flex justify-content-between">
      <div>
        <button class="btn btn-sm btn-primary text-white me-3" @click="search">搜尋</button>
        <!-- <img src="../assets/reset.png" alt="reset" @click="clear"> -->
        <button class="btn btn-sm btn-outline-primary" style="margin-left: 10px;" @click="clear">清除搜尋結果</button>
      </div>
      <button class="btn btn-sm btn-primary text-white" @click="exportExcel">匯出</button>
    </section>
  </div>
  <div v-if="!isLoading" class="content mt-3">
    <el-table :data="paginatedData" class="el-table" stripe height="48vh">
      <el-table-column label="儲值種類" prop="chargeType" align="center" width="60"></el-table-column>
      <el-table-column label="場站" prop="name" align="center" width="90"></el-table-column>
      <el-table-column label="賣方統編" prop="parkTax" align="center" width="100"></el-table-column>
      <el-table-column label="車號" prop="plate" align="center" width="100"></el-table-column>
      <el-table-column label="帳號" prop="user_acc" align="center" width="90"></el-table-column>
      <el-table-column label="交易金額" prop="Amount" align="center" width="90" :formatter="amountFormatter"></el-table-column>
      <el-table-column label="帳戶餘額" prop="newAmount" align="center" width="100"
        :formatter="amountFormatter"></el-table-column>
      <el-table-column label="發票號碼" align="center" width="150">
        <template v-slot="{ row }">
          <a v-if="row.inv != ''" :href="`https://mitwit-line-web-server.herokuapp.com/download/pdf/${row.token}/?inv=${row.inv}&openExternalBrowser=1`"
            target="_blank">
            {{ row.invoice }}
          </a>
          <span v-else>{{ row.invoice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="發票金額" prop="totalAmount" align="center" width="80" :formatter="amountFormatter"></el-table-column>
      <el-table-column label="隨機碼" prop="randomCode" align="center" width="80"></el-table-column>
      <el-table-column label="發票日期" prop="invoiceDate" align="center" width="150"></el-table-column>
      <el-table-column label="入場時間" prop="arrivalTime" align="center" width="200"></el-table-column>
      <el-table-column label="變動時間" prop="logTime" align="center" width="200"></el-table-column>
      <el-table-column label="買方統編" prop="Bidentifier" align="center" width="100"></el-table-column>
      <el-table-column label="買方抬頭" prop="BName" align="center" width="100"></el-table-column>
    </el-table>
  </div>
  <div class="none">
    <el-table :data="transactions" id="transactionsTable" class="el-table" style="font-size: 1rem;" stripe>
      <el-table-column label="儲值種類" prop="chargeType" align="center" width="60"></el-table-column>
      <el-table-column label="場站" prop="name" align="center" width="90"></el-table-column>
      <el-table-column label="賣方統編" prop="parkTax" align="center" width="100"></el-table-column>
      <el-table-column label="車號" prop="plate" align="center" width="100"></el-table-column>
      <el-table-column label="帳號" prop="user_acc" align="center" width="90"></el-table-column>
      <el-table-column label="交易金額" prop="Amount" align="center" width="90"></el-table-column>
      <el-table-column label="帳戶餘額" prop="newAmount" align="center" width="100"></el-table-column>
      <el-table-column label="發票號碼" align="center" width="150">
        <template v-slot="{ row }">
          <a v-if="row.inv != ''" :href="`https://mitwit-line-web-server.herokuapp.com/download/pdf/${row.token}/?inv=${row.inv}&openExternalBrowser=1`"
            target="_blank">
            {{ row.invoice }}
          </a>
          <span v-else>{{ row.invoice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="發票金額" prop="totalAmount" align="center" width="80"></el-table-column>
      <el-table-column label="隨機碼" prop="randomCode" align="center" width="80"></el-table-column>
      <el-table-column label="發票日期" prop="invoiceDate" align="center" width="150"></el-table-column>
      <el-table-column label="入場時間" prop="arrivalTime" align="center" width="200"></el-table-column>
      <el-table-column label="變動時間" prop="logTime" align="center" width="200"></el-table-column>
      <el-table-column label="買方統編" prop="Bidentifier" align="center" width="100"></el-table-column>
      <el-table-column label="買方抬頭" prop="BName" align="center" width="100"></el-table-column>
    </el-table>
  </div>
  <div v-if="!isLoading" class="pagination">
    <!-- pagination -->
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-size="pageSize" :total="transactions.length">
    </el-pagination>
  </div>
</template>

<style>
.content {
  max-width: 80%;
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.md {
  display: flex;
  justify-content: space-between;
}

.none {
  display: none;
}

.sm {
  display: none;
}

@media (max-width: 576px) {
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sm {
    display: block;
  }

  .md {
    display: none;
  }
}
</style>
