<script>
import {
    ElTable,
    ElTableColumn,
    ElButton,
} from 'element-plus';
import 'element-plus/theme-chalk/index.css';



const Api = 'http://219.85.163.90:3000';

export default {
    components: {
        ElTable,
        ElTableColumn,
        ElButton,
    },
    data() {
        return {
            plateList: [],
            isLoading: true,
            mid: '',
            c: '',
        }
    },
    methods: {
        // 車號清單
        getPlateList() {
            this.getMidnC();
            const getPlateListApi = `${Api}/main/PlateList/${this.mid}&${this.c}`;
            this.$http
                .post(getPlateListApi)
                .then((response) => {
                    this.plateList = response.data;
                    this.isLoading = false;
                })
        },
        // 查看儲值扣抵明細
        viewDetails(row) {
            const checkPlate = btoa(row.plate);
            sessionStorage.setItem('plate', checkPlate)
            this.$router.push({
                name: 'home',
                query: {
                    mid: this.mid,
                    c: this.c
                },
            })
        },
        getMidnC() {
            this.mid = this.$route.query.mid;
            this.c = this.$route.query.c;
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
        <el-table :data="plateList" stripe style="align-items: center" width="100%" height="60vh">
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
  