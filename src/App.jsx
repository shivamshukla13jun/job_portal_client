
import Aos from "aos";
import { QueryClientProvider, QueryClient, keepPreviousData } from "@tanstack/react-query";
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
import JobListPage1 from "./pages/job-list/job-list-v1";
import JobSingleDynamicV1 from "./pages/job-single/job-single-v1";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import EmployerListPage1 from "./pages/employers-list/employers-list-v1";
import EmployersSingleV1 from "./pages/employers-single/employers-single-v1";
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
import LoginPage from "./pages/others/login";
import RegisterPage from "./pages/others/register";
import Verify from "./pages/others/verify";
import ForgotPasswordPage from "./pages/others/forgot";
import ResetPassword from "./pages/others/resetpassword";

// admin

// eemployers
import DashboardEmploeeDBPage from "./pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./pages/employers-dashboard/company-profile";
import PostJobsEmploeeDBPage from "./pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./pages/employers-dashboard/all-applicants";
import PackageEmploeeDBPage from "./pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "./pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "./pages/employers-dashboard/resume-alerts"
import EditJob from "./components/dashboard-pages/employers-dashboard/edit-jobs";
import SubEmployer from "./pages/employers-dashboard/subemployers";
// candidates
import DashboardPage from "./pages/candidates-dashboard/dashboard";
import AppliedJobsPage from "./pages/candidates-dashboard/applied-jobs";
import MyProfilePage from "./pages/candidates-dashboard/my-profile";
import MyResumePage from "./pages/candidates-dashboard/my-resume";
import PackagePage from "./pages/candidates-dashboard/packages";
import ShortListedJobsPage from "./pages/candidates-dashboard/short-listed-jobs";
import SavedJobsPage from "./pages/candidates-dashboard/saved-jobs";

// subemployers 
import DashboardSubemplyerDBPage from "./pages/subemployers-dashboard/dashboard";
import ShortListedResumes from "./pages/shortlisted-resumes";
// authotrizations
import UnauthorizedPage from "./pages/others/UnauthorizedPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MeetingList from "./pages/subemployers-dashboard/Meetings";
import CandidateListPage2 from "./pages/candidates-list/candidates-list-v2";
import ChangePassword from "./pages/change-password/ChangePassword";
function App() {

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
                <Route path="job-list-v1" element={<JobListPage1 />} />
                <Route path="job/:id" element={<JobSingleDynamicV1 />} />
                <Route path="employers-list-v1" element={<EmployerListPage1 />} />
                <Route path="employer/:id" element={<EmployersSingleV1 />} />
                <Route path="candidates-list-v1" element={<CandidateListPage2 />} />
                <Route path="candidate/:id" element={<CandidateSingleDynamicV1 />} />
                <Route path="applicant/:id" element={<CandidateSingleDynamicV1 />} />
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
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="employers-dashboard" element={
                  <ProtectedRoute  requiredRole="employer">
                    <Outlet />
                  </ProtectedRoute>
                }
              >  
                  <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
                  <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
                  <Route path="subemployer" element={<SubEmployer />} />
                  <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                  <Route path="edit-job/:id" element={<EditJob />} />
                  <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage />} />
                  <Route path="all-applicants" element={<AllApplicantsEmploeesPage />} />
                  <Route path="shortlisted-resumes/:EmployerId" element={<ShortListedResumes />} />
                  <Route path="meetinglinks/:createdBy" element={<MeetingList />} />

                  <Route path="packages" element={<PackageEmploeeDBPage />} />
                  <Route path="messages" element={<MessageEmploeeDBPage />} />
                  <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>
              
                <Route 
                path="subemployers-dashboard" 
                element={
                  <ProtectedRoute requiredRole="subemployer">
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                  <Route path="dashboard" element={<DashboardSubemplyerDBPage />} />
                  <Route path="meetinglinks/:createdBy" element={<MeetingList />} />
                  <Route path="shortlisted-resumes/:SubEmployerId" element={<ShortListedResumes />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>
                <Route 
                path="candidates-dashboard" 
                element={
                  <ProtectedRoute requiredRole="candidate">
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="applied-jobs" element={<AppliedJobsPage />} />
                  <Route path="saved-jobs" element={<SavedJobsPage />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="my-profile" element={<MyProfilePage />} />
                  <Route path="my-resume" element={<MyResumePage />} />
                  <Route path="packages" element={<PackagePage />} />
                  <Route path="short-listed-jobs" element={<ShortListedJobsPage />} />
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
