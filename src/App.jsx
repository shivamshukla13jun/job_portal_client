
import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages";
import HomePage1 from "./pages/home/home-1";
import JobListPage1 from "./pages/job-list/job-list-v1";
import JobSingleDynamicV1 from "./pages/job-single/job-single-v1";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import EmployerListPage1 from "./pages/employers-list/employers-list-v1";
import EmployersSingleV1 from "./pages/employers-single/employers-single-v1";
import CandidateListPage1 from "./pages/candidates-list/candidates-list-v1";
import CandidateSingleDynamicV1 from "./pages/candidates-single/candidates-single-v1";
import BlogListpage1 from "./pages/blog/blog-list-v1";
import BlogDetailsDynamic from "./pages/blog/blog-details";
import AboutPage from "./pages/others/about";
import PricingPage from "./pages/others/pricing";
import FaqPage from "./pages/others/faq";
import TermsPage from "./pages/others/terms";
import InvoicePage from "./pages/others/invoice";
import ContactPage from "./pages/others/contact";
import NotFoundPage from "./pages/others/404";
import DashboardEmploeeDBPage from "./pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./pages/employers-dashboard/company-profile";
import PostJobsEmploeeDBPage from "./pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./pages/employers-dashboard/all-applicants";
import ShortListedResumeEmploeeDBPage from "./pages/employers-dashboard/shortlisted-resumes";
import PackageEmploeeDBPage from "./pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "./pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "./pages/employers-dashboard/resume-alerts";
import ChangePasswordEmploeeDBPage from "./pages/employers-dashboard/change-password";
import DashboardPage from "./pages/candidates-dashboard/dashboard";
import AppliedJobsPage from "./pages/candidates-dashboard/applied-jobs";
import ChangePasswordPage from "./pages/candidates-dashboard/change-password";
import CVMannagerPage from "./pages/candidates-dashboard/cv-manager";
import JobAlertPage from "./pages/candidates-dashboard/job-alerts";
import MessageesPage from "./pages/candidates-dashboard/messages";
import MyProfilePage from "./pages/candidates-dashboard/my-profile";
import MyResumePage from "./pages/candidates-dashboard/my-resume";
import PackagePage from "./pages/candidates-dashboard/packages";
import ShortListedJobsPage from "./pages/candidates-dashboard/short-listed-jobs";
import LoginPage from "./pages/others/login";
import RegisterPage from "./pages/others/register";
import ShopListPage from "./pages/shop/shop-list";
import ShopSingleDyanmic from "./pages/shop/shop-single";
import CartPage from "./pages/shop/cart";
import CheckoutPage from "./pages/shop/checkout";
import OrderCompletedPage from "./pages/shop/order-completed";
import { QueryClientProvider, QueryClient, keepPreviousData } from "@tanstack/react-query";
import Verify from "./pages/others/verify";
import EditJob from "./components/dashboard-pages/employers-dashboard/edit-jobs";
import { decrypt } from "./lib/encrypt";
import { paths } from "./services/paths";
import ForgotPasswordPage from "./pages/others/forgot";
import ResetPassword from "./pages/others/resetpassword";
import SavedJobsPage from "./pages/candidates-dashboard/saved-jobs";
import SubEmployer from "./pages/employers-dashboard/subemployers";
import DashboardSubemplyerDBPage from "./pages/subemployers-dashboard/dashboard";

function App() {

  const userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(decrypt(sessionStorage.getItem("userInfo")))?.userType?.name?.toLowerCase() : null;
  console.log({userInfo})
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: keepPreviousData,
        // staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1
      }
    }
  })

  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);


  return (
    <QueryClientProvider client={query}>
      <Provider store={store}>
        <div className="page-wrapper">
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="home-1" element={<HomePage1 />} />

                <Route path="job-list-v1" element={<JobListPage1 />} />
                <Route path="job/:id" element={<JobSingleDynamicV1 />} />

                <Route path="employers-list-v1" element={<EmployerListPage1 />} />

                <Route path="employer/:id" element={<EmployersSingleV1 />} />

                <Route path="candidates-list-v1" element={<CandidateListPage1 />} />

                <Route path="candidate/:id" element={<CandidateSingleDynamicV1 />} />

                <Route path="blog-list-v1" element={<BlogListpage1 />} />
                <Route path="blog-details/:id" element={<BlogDetailsDynamic />} />

                <Route path="about" element={<AboutPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="invoice" element={<InvoicePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="resetpassword" element={<ResetPassword/>} />
                <Route path="forgot" element={<ForgotPasswordPage />} />
                <Route path="verify" element={<Verify />} />
                <Route path="*" element={<NotFoundPage />} />

                <Route path="employers-dashboard" element={userInfo === 'employer' ? <Outlet /> : <Navigate to={paths.home} />}  >
                  <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
                  <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
                  <Route path="subemployer" element={<SubEmployer />} />
                  <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                  <Route path="edit-job/:id" element={<EditJob />} />
                  <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage />} />
                  <Route path="all-applicants" element={<AllApplicantsEmploeesPage />} />
                  <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage />} />
                  <Route path="packages" element={<PackageEmploeeDBPage />} />
                  <Route path="messages" element={<MessageEmploeeDBPage />} />
                  <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage />} />
                  <Route path="change-password" element={<ChangePasswordEmploeeDBPage />} />
                </Route>
                <Route path="subemployers-dashboard" element={userInfo === 'subemployer' ? <Outlet /> : <Navigate to={paths.home} />}  >
                  <Route path="dashboard" element={<DashboardSubemplyerDBPage />} />
                  <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
                  <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage />} />
                  <Route path="change-password" element={<ChangePasswordEmploeeDBPage />} />
                </Route>

                <Route path="candidates-dashboard" element={userInfo === 'candidate' ? <Outlet /> : <Navigate to={paths.home} />}  >
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="applied-jobs" element={<AppliedJobsPage />} />
                  <Route path="saved-jobs" element={<SavedJobsPage />} />
                  <Route path="change-password" element={<ChangePasswordPage />} />
                  <Route path="cv-manager" element={<CVMannagerPage />} />
                  <Route path="job-alerts" element={<JobAlertPage />} />
                  <Route path="messages" element={<MessageesPage />} />
                  <Route path="my-profile" element={<MyProfilePage />} />
                  <Route path="my-resume" element={<MyResumePage />} />
                  <Route path="packages" element={<PackagePage />} />
                  <Route path="short-listed-jobs" element={<ShortListedJobsPage />} />
                </Route>

                <Route path="shop" >

                  <Route path="shop-list" element={<ShopListPage />} />
                  <Route path="shop-single/:id" element={<ShopSingleDyanmic />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-completed" element={<OrderCompletedPage />} />
                </Route>

              </Route>
            </Routes>
            <ScrollTopBehaviour />
          </BrowserRouter>



          {/* Toastify */}
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* <!-- Scroll To Top --> */}
          <ScrollToTop />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
