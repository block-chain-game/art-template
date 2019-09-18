"use strict";

import RouterClass from "./../utils/router";
import PageA from './../art/pageA.art';
import PageB from './../art/pageB.art';
import PageC from './../art/pageC.art';
// 实例化Router
window.Router = new RouterClass();
var app = $("#app");

//生成页面
const PageAPage = PageA();
const PageBPage = PageB();
const PageCPage = PageC();

//页面挂载到路由上      
Router.route('/',PageAPage,app);
Router.route('/pageB',PageBPage,app);
Router.route('/pageC',PageCPage,app);
