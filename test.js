

// .widget.woocommerce.widget_shopping_cart{
// 	border-radius: 10px;
// }

// .search-field, .button, .added_to_cart, button.menu-toggle,input.search-field{
// 	border-radius: 50px;
// }

// .si-header-widgets .si-header-widget:not(.si-header-widget__button) .si-icon {
// 	font-size: 1.6em;
// 	color:#015772;
// 	transition: .5s  ease-in-out all;
// }


	
// .landing-title{
// 	margin: 1em auto;
// }
// .site-description{
// 	font-weight: 700;
// 	}

// .landing-btn a{
// 	padding: 15px 55px;
// 	background:#015772;
// 	border: solid 1.5px #aa9c6f;
// transition: .5s  ease-in-out all;
// }
// .landing-btn a:hover, .si-header-widgets.si-header-widget:not(.si-header-widget__button).si-icon:hover{
// background: #aa9c6f;
// }
// .landing-btn-container{
// 	display: flex;
// 	align-items: center;
// 	justify-content:center;
// }
// .landing-btn-container a{
// margin: auto;
// }
//  .attachment-full.wp-post-image{
// border-radius: 20px;
// animation: fadeInUpx 3s infinite ease-in-out;
// }

// .heart-world{

//   transition: 0.7s 0.2s ease-in-out;
//   -webkit-transition:  0.7s 0.2s ease-in-out;
//   -moz-transition:  0.7s 0.2s ease-in-out;
//   -ms-transition:  0.7s 0.2s ease-in-out;
//   -o-transition:  0.7s 0.2s ease-in-out;
//   margin: auto;

// }


// .heart-world:hover {
//   -webkit-transform: scale(0.8) rotate(180deg);
//   -moz-transform:scale(0.8) rotate(180deg);
//   -o-transform: scale(0.8) rotate(180deg) ;
//   -ms-transform: scale(0.8)rotate(180deg);
//   transform: scale(0.8) rotate(180deg);
	
// }

// #sinatra-copyright .si-copyright-widget__text a{
// 	display: none;
// }
// #sinatra-copyright .sinatra-social-nav>ul>li>a .si-icon{
// /* 	font-size: 35px; */
// 	height: 35px;
// 	margin-bottom:24px;
// }
// .si-copyright-widget__socials, .sinatra-copyright-layout-1 #sinatra-copyright>.si-container>.si-flex-row>div{
// 	display: flex !important;
// 	flex-direction: column !important;
// }

// .lhistoire{
// margin: auto;
// }



// .logo-inner img{
//   -webkit-transform: scale(1);
//   transform: scale(1);
//   -webkit-transition: .3s ease-in-out;
//   transition: .3s ease-in-out;
// }
// .logo-inner:hover img {
//   -webkit-transform: scale(1.2);
//   transform: scale(1.2);
// }

// .wmc-currency ,.wmc-title{
// 	border-top-left-radius: 30px;
// 	border-bottom-left-radius: 30px;

// }


// .swing figure {
//     animation: swing ease-in-out 1s infinite alternate;
//     transform-origin: center -20px;
//     float:left;

// }


// @keyframes swing {
//     0% { transform: rotate(3deg)skewY(5deg) }
//     100% { transform: rotate(-3deg)skewX(5deg) }
// }
// @-webkit-keyframes swing {
//     0% { transform: rotate(3deg)skewY(5deg) }
//     100% { transform: rotate(-3deg)skewX(5deg) }
// }
// @media (max-width: 700px){
// 	.logo-inner {
// 		width:170px;
// 		}
// 	.swing figure {
//     animation: swing-small ease-in-out 1s infinite alternate;
// 		max-width:90%;
// }
// 	.landing-btn a{
// 	padding: 10px 35px;
// 		margin: auto;
// }
// .wp-block-buttons.landing-btn-container-internal{
// 		display: flex;
// 		flex-direction:column;
// 		align-items: center;
// 		justify-content:center;
// 	}	
//  @keyframes swing-small {
//     0% { transform: rotate(1deg)skewY(5deg) 
// 	 }
//     100% { transform: rotate(-1deg)skewX(5deg) }
// }
// @-webkit-keyframes swing-small {
//     0% { transform: rotate(1deg) }
//     100% { transform: rotate(-1deg) }
// }
// }


// @-webkit-keyframes darkenBorder {
//     0% { 
// 				box-shadow:  0px 0px 0px 
// #c6a073, 0px 0px 2px 
// #17455c;
// 	}
	
//     100% {
// 	box-shadow:  1px 10px 25px 
// #c6a073, 1px 4px 40px 
// #17455c;
// 	}
// }
// .offer-shipping-wrapper {
// border-radius:10px;
// font-weight:200;
// 	transition: 3s;
// animation: darkenBorder 3s linear infinite;
// }
// .is-style-dots{
// 	font-weight: 900;
// }

// .announcement-sold-out{
//   z-index: 99;
//   position: fixed;
//   top: -200px;
//   right 0px;
// }
var main = document.querySelector('.site-main');
var announcement = document.createElement('div');
announcement.innerHTML = 'We are sold out!';
announcement.classList.add('announcement-sold-out');

announcement.setAttribute()

sessionStorage.setItem('soldOutClosed', 'true')