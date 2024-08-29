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
                        <div class="col-3 col-xs-3 burger-button-wrapper">
                            <div v-if="isSmallScreen"
                                 class="burger-button-wrapper">
                                <div class="burger-button"
                                     @click="toggleSidebar"></div>
                            </div>
                            <div v-if="!isSmallScreen"
                                 class="cart-button-wrapper"
                                 v-tooltip="$t('dashboard.toCart')"
                                 @click="goToCart">
                                <div class="cart-button"
                                     :class="{ 'animation-pulse': cartNotEmpty }">
                                </div>
                                <span>Warenkorb</span>
                            </div>
                        </div>
                        <div class="col-6 col-xs-6">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="col-3 col-xs-3 user-amount"
                             v-tooltip="$t('general.userInfo')">
                            <span class="icon-users"></span>
                            {{ userAmount }}
                        </div>
                    </div>
                    <transition name="fade" mode="out-in">
                        <router-view class="faster-fade"
                                     @change-title="changeTitle"></router-view>
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
