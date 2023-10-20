<script>
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
} from 'element-plus';

const Api = 'https://5644-122-116-23-30.ngrok-free.app';

export default {
  data() {
    return {
      plate: '',
      isLoading: true,
      transactions: [
        {
          "chargeType": "扣抵",
          "name": "test",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 3235,
          "invoice": "TE43427304",
          "totalAmount": 40,
          "randomCode": "7304",
          "invoiceDate": "2023-10-11",
          "arrivalTime": "2023-10-11 14:16:14",
          "logTime": "2023-10-11 14:59:11",
          "Bidentifier": null,
          "BName": null
        },
        {
          "chargeType": "扣抵",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 3275,
          "invoice": "TE43426936",
          "totalAmount": 40,
          "randomCode": "6936",
          "invoiceDate": "2023-10-09",
          "arrivalTime": "2023-10-09 07:23:18",
          "logTime": "2023-10-09 08:15:45",
          "Bidentifier": null,
          "BName": null
        },
        {
          "chargeType": "儲值",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 3315,
          "logTime": "2023-10-06 14:11:13"
        },
        {
          "chargeType": "儲值",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 2245,
          "logTime": "2023-10-05 11:51:08"
        },
        {
          "chargeType": "扣抵",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 245,
          "invoice": "TE43426244",
          "totalAmount": 40,
          "randomCode": "6244",
          "invoiceDate": "2023-10-04",
          "arrivalTime": "2023-10-04 10:41:55",
          "logTime": "2023-10-04 11:31:36",
          "Bidentifier": null,
          "BName": null
        },
        {
          "chargeType": "扣抵",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 285,
          "invoice": "TE43426017",
          "totalAmount": 60,
          "randomCode": "6017",
          "invoiceDate": "2023-10-02",
          "arrivalTime": "2023-10-02 13:22:05",
          "logTime": "2023-10-02 14:28:58",
          "Bidentifier": null,
          "BName": null
        },
        {
          "chargeType": "扣抵",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 345,
          "invoice": "TE43425979",
          "totalAmount": 40,
          "randomCode": "5979",
          "invoiceDate": "2023-10-02",
          "arrivalTime": "2023-10-02 10:25:59",
          "logTime": "2023-10-02 11:03:49",
          "Bidentifier": null,
          "BName": null
        },
        {
          "chargeType": "扣抵",
          "name": "助安板橋殯儀館",
          "parkTax": "87545768",
          "plate": "BGB-3832",
          "user_acc": "99769806509643",
          "newAmount": 385,
          "invoice": "TE43401898",
          "totalAmount": 30,
          "randomCode": "1898",
          "invoiceDate": "2023-09-28",
          "arrivalTime": "2023-09-28 15:18:44",
          "logTime": "2023-09-28 15:49:23",
          "Bidentifier": null,
          "BName": null
        },
      ],
      currentPage: 1,
      pageSize: 10,
      searchFrom: '',
      searchTo: ''
    }
  },
  methods: {
    getDetails() {
      this.plate = atob(this.$route.params.plate);
      const getDetailsApi = `${Api}/main/detail2`;
      this.$http
        .post(getDetailsApi, { plate: this.plate })
        .then((response) => {
          this.transactions = response.data.CHARGE_RECORD;
          this.isLoading = false;
        })
    },
    // 數字千分位格式
    amountFormatter(row, column, cellValue) {
      cellValue += '';
      if (!cellValue.includes('.')) cellValue += '.';
      return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
      }).replace(/\.$/, '');
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
  },
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
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
  <div v-if="!isLoading" class="content mt-3 d-flex justify-content-between">
    <section>
      <span class="me-3">請選擇區間搜尋</span>
      <input type="date" class="pe-3 me-2" v-model="searchFrom">
      <span>～ </span>
      <input type="date" class="pe-3 me-2" v-model="searchTo">
      <button class="btn btn-primary text-white">搜尋</button>
    </section>
    <section>
      <button class="btn btn-primary text-white">匯出</button>
    </section>
  </div>
  <div v-if="!isLoading" class="content mt-3">
    <el-table :data="paginatedData" class="el-table" style="font-size: 1rem;" stripe>
      <el-table-column label="儲值種類" prop="chargeType" align="center" width="60"></el-table-column>
      <el-table-column label="場站" prop="name" align="center" width="90"></el-table-column>
      <el-table-column label="賣方統編" prop="parkTax" align="center" width="100"></el-table-column>
      <el-table-column label="車號" prop="plate" align="center" width="100"></el-table-column>
      <el-table-column label="帳號" prop="user_acc" align="center" width="90"></el-table-column>
      <el-table-column label="帳戶餘額" prop="newAmount" align="center" width="100"
        :formatter="amountFormatter"></el-table-column>
      <el-table-column label="發票號碼" prop="invoice" align="center" width="150"></el-table-column>
      <el-table-column label="金額" prop="totalAmount" align="center" width="80"
        :formatter="amountFormatter"></el-table-column>
      <el-table-column label="隨機碼" prop="randomCode" align="center" width="80"></el-table-column>
      <el-table-column label="發票日期" prop="invoiceDate" align="center" width="150"></el-table-column>
      <el-table-column label="入場時間" prop="arrivalTime" align="center" width="200"></el-table-column>
      <el-table-column label="變動時間" prop="logTime" align="center" width="200"></el-table-column>
      <el-table-column label="買方統編" prop="Bidentifier" align="center" width="100"></el-table-column>
    </el-table>
  </div>
  <div v-if="!isLoading" class="content pagination">
    <!-- pagination -->
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize" :total="transactions.length">
    </el-pagination>
  </div>
</template>

<style>
.content {
  max-width: 80%;
  margin: 0 auto;
}

.el-table {
  width: 100%;
  height: 80%;
}

.pagination {
  position: fixed;
  top: 93%;
  left: 35%;
}
</style>
