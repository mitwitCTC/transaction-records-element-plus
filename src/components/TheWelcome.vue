<script>
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
} from 'element-plus';
export default {
  data() {
    return {
      transactions: [
        {
          id: 1,
          type: "折抵",
          station: "西園1",
          seller: "56632513",
          plate: "XXX-111",
          account: "ABC111",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "111",
          issueDate: "2023-10-01",
          entryTime: "2023-10-01 11:11:11",
          departTime: "2023-10-01 11:11:11",
          buyer: "12345678"
        },
        {
          id: 2,
          type: "儲值",
          station: "西園2",
          seller: "56632513",
          plate: "XXX-222",
          account: "ABC222",
          balance: 1550,
          invoice: "QW123456789",
          amount: 1000,
          randonCode: "222",
          issueDate: "2023-10-01",
          entryTime: "2023-10-01 12:11:11",
          departTime: "2023-10-01 13:11:11",
          buyer: "12345678"
        },
        {
          id: 3,
          type: "折抵",
          station: "西園3",
          seller: "56632513",
          plate: "XXX-333",
          account: "ABC333",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "333",
          issueDate: "2023-10-02",
          entryTime: "2023-10-02 12:11:11",
          departTime: "2023-10-02 14:11:11",
          buyer: "12345678"
        },
        {
          id: 4,
          type: "儲值",
          station: "西園4",
          seller: "56632513",
          plate: "XXX-444",
          account: "ABC444",
          balance: 550,
          invoice: "QW123456789",
          amount: 500,
          randonCode: "444",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 5,
          type: "折抵",
          station: "西園3",
          seller: "56632513",
          plate: "XXX-555",
          account: "ABC555",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "555",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 6,
          type: "儲值",
          station: "西園2",
          seller: "56632513",
          plate: "XXX-666",
          account: "ABC666",
          balance: 550,
          invoice: "QW123456789",
          amount: 500,
          randonCode: "666",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 7,
          type: "折抵",
          station: "西園3",
          seller: "56632513",
          plate: "XXX-777",
          account: "ABC777",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "777",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 8,
          type: "儲值",
          station: "西園2",
          seller: "56632513",
          plate: "XXX-888",
          account: "ABC888",
          balance: 550,
          invoice: "QW123456789",
          amount: 500,
          randonCode: "888",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 9,
          type: "折抵",
          station: "西園3",
          seller: "56632513",
          plate: "XXX-999",
          account: "ABC999",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "999",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 10,
          type: "儲值",
          station: "西園2",
          seller: "56632513",
          plate: "XXX-1010",
          account: "ABC1010",
          balance: 550,
          invoice: "QW123456789",
          amount: 500,
          randonCode: "000",
          issueDate: "2023-10-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
        {
          id: 11,
          type: "折抵",
          station: "西園3",
          seller: "56632513",
          plate: "XXX-1111",
          account: "ABC1111",
          balance: 450,
          invoice: "QW123456789",
          amount: 50,
          randonCode: "1111",
          issueDate: "2023-09-04",
          entryTime: "2023-10-04 11:11:11",
          departTime: "2023-10-04 11:11:11",
          buyer: "12345678"
        },
      ],
      currentPage: 1,
      pageSize: 10,
      searchFrom: '',
      searchTo: ''
    }
  },
  methods: {
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
  <div class="content d-flex justify-content-between">
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
  <div class="content mt-3">
    <el-table :data="paginatedData" style="width: 100%;">
      <el-table-column label="儲值種類" prop="type" align="center" width="80"></el-table-column>
      <el-table-column label="場站" prop="station" align="center" width="100"></el-table-column>
      <el-table-column label="賣方統編" prop="seller" align="center" width="100"></el-table-column>
      <el-table-column label="車號" prop="plate" align="center" width="100"></el-table-column>
      <el-table-column label="帳號" prop="account" align="center" width="100"></el-table-column>
      <el-table-column label="帳戶餘額" prop="balance" align="center" width="100"></el-table-column>
      <el-table-column label="發票號碼" prop="invoice" align="center" width="150"></el-table-column>
      <el-table-column label="金額" prop="amount" align="center" width="80"></el-table-column>
      <el-table-column label="隨機碼" prop="randonCode" align="center" width="80"></el-table-column>
      <el-table-column label="發票日期" prop="issueDate" align="center" width="150"></el-table-column>
      <el-table-column label="入場時間" prop="entryTime" align="center" width="200"></el-table-column>
      <el-table-column label="變動時間" prop="departTime" align="center" width="200"></el-table-column>
      <el-table-column label="買方統編" prop="buyer" align="center" width="100"></el-table-column>
    </el-table>
  </div>
  <div class="content d-flex justify-content-center fixed-bottom">
    <!-- pagination -->
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize" :total="transactions.length">
    </el-pagination>
  </div>
</template>

<style>
.content {
  max-width: 80%;
  margin: 50px auto;
}
</style>
