<script>
import {
    ElTable,
    ElTableColumn,
    ElButton,
} from 'element-plus';
import 'element-plus/theme-chalk/index.css';



const Api = 'https://2091-122-116-23-30.ngrok-free.app';

export default {
    components: {
        ElTable,
        ElTableColumn,
        ElButton,
    },
    data() {
        return {
            plateList: [
                {
                    "userId": "4_11206820045",
                    "user_name": "劉文吉",
                    "plate": "BLG-6250",
                    "parkTax": "87545768",
                    "user_acc": "99769806509623",
                    "name": "助安板橋殯儀館"
                },
                {
                    "userId": "4_11206820047",
                    "user_name": "劉文吉",
                    "plate": "BGB-3832",
                    "parkTax": "87545768",
                    "user_acc": "99769806509643",
                    "name": "助安板橋殯儀館"
                },
                {
                    "userId": "4_11206820046",
                    "user_name": "劉文吉",
                    "plate": "BUK-1871",
                    "parkTax": "87545768",
                    "user_acc": "99769806509638",
                    "name": "助安板橋殯儀館"
                }
            ],
            isLoading: true,
        }
    },
    methods: {
        // 車號清單
        getPlateList() {
            const getPlateListApi = `${Api}/main/PlateList`;
            this.$http
                .post(getPlateListApi)
                .then((response) => {
                    this.plateList = response.data;
                    this.isLoading = false;
                })
        },
        // 查看儲值扣抵明細
        viewDetails(row) {
            const checkPlate = row.plate;
            this.$router.push({ name: 'home', params: { plate: checkPlate } })
        },
    },
    mounted() {
        this.getPlateList();
    }
}
</script>

<template>
    <div class="header w-100">
        <p class="text-center text-white fs-3 bg-primary py-3">
            車牌列表
        </p>
    </div>
    <div v-if="isLoading" class="d-flex flex-column align-items-center">
        <div>
            <img src="../assets/loading.svg" alt="loading">
        </div>
        <div>努力加載中，請稍候...</div>
    </div>
    <div v-if="!isLoading" class="container">
        <el-table :data="plateList" stripe style="width: 100% align-items: center">
            <el-table-column align="center" prop="name" label="場站" />
            <el-table-column align="center" prop="plate" label="車號" />
            <el-table-column align="center" prop="user_name" label="用戶名" />
            <el-table-column align="center" prop="user_acc" label="帳號" />
            <el-table-column align="center" label="查看">
                <template #default="scope">
                    <el-button @click="viewDetails(scope.row)">查看明細</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<style></style>
  