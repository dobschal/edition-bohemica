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
                        <div class="col-2 col-xs-2 burger-button-wrapper">
                            <div v-if="isSmallScreen" class="burger-button"
                                 @click="toggleSidebar"></div>
                            <div class="cart-button-wrapper"
                                 v-tooltip="$t('dashboard.toCart')"
                                 @click="goToCart">
                                <div class="cart-button"
                                     :class="{ 'animation-pulse': cartNotEmpty }">
                                </div>
                                <span v-if="!isSmallScreen">{{ $t('dashboard.toCart') }}</span>
                            </div>
                        </div>
                        <div class="col-8 col-xs-8">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="col-2 col-xs-2 user-amount"
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
