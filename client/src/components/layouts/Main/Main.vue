<template>
    <div class="main">
         <div id="wrapper" :class="{ 'toggled': sidebarToggled }">

            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                <sidebar></sidebar>
            </div>
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">  
                    <div class="row topbar align-items-center">
                        <div class="col burger-button-wrapper">
                            <div class="burger-button" @click="toggleSidebar"></div>
                        </div>
                        <div class="col-8">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="col user-amount">
                            <span class="icon-users"></span>
                            {{ userAmount }}
                        </div>
                    </div>
                    <transition name="fade" mode="out-in" >
                        <router-view class="faster-fade" @change-title="changeTitle"></router-view>
                    </transition>              
                </div>

            </div>
            <!-- /#page-content-wrapper -->

        </div>
    </div>
</template>

<!-- Mark: Controller -->

<script src="./Main.js"></script>


<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- -- -->

<style lang="scss" scoped src="./Main.scss"></style>
