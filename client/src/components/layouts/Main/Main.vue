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
                    <div class="row topbar align-items-center mb-3 pb-3">
                        <div class="col" @click="toggleSidebar">
                            <div class="burger-button"></div>
                        </div>
                        <div class="col-6">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="col" id="top-right-corner">
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
