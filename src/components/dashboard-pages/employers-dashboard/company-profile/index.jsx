import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import BusinessDetail from "./components/BusinessDetail";

import { getById, put } from "@/services/api";
import { employerSchema } from "@/validations/dashboard/employer";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_EMPLOYER_PATH } from "@/lib/config";

const index = () => {
    const userInfo = useUserInfo();
    const [previewData, setPreviewData] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: [`employer${userInfo._id}`],
        queryFn: async () => {
            const res = await getById('/employer', userInfo._id);
            return res.data.data;
        },
        enabled: !!userInfo._id
    });

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employerSchema),
        defaultValues: {
            business_name: '',
            name: {
                first: '',
                middle: '',
                last: '',
            },
            email: '',
            business_gst: '',
            categories: [],
            phone_area: '',
            phone: '',
            address: {
                lane1: '',
                lane2: '',
                city: '',
                state: '',
                pin_code: '',
                country: ''
            },
            product_services: '',
            url: '',
            year_established: new Date(),
            logo: {},
            keywords: '',
            videos: {},
            pictures: {},
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => put(`/employer`, userInfo._id, data),
        onSuccess: (res) => {
            console.log(res);
            toast.success(res.data.message)
        },
        onError: (err) => {
            toast.error(err.response.data.error)
        }
    });

    const handleRegisterSubmit = async (data) => {
        const formData = new FormData();
        
        // Format the name
        const name = `${data.name.first} ${data.name.middle} ${data.name.last}`.trim();
        
        // Create the base data object
        const formattedData = {
            business_name: data.business_name,
            business_gst: data.business_gst,
            categories: data.categories,
            email: data.email,
            name: name,
            phone_area: data.phone_area,
            phone: data.phone,
            address: {
                lane1: data.address.lane1,
                lane2: data.address.lane2,
                city: data.address.city,
                state: data.address.state,
                pin_code: data.address.pin_code,
                country: data.address.country
            },
            keywords: data.keywords,
            product_services: data.product_services,
            url: data.url,
            year_established: data.year_established
        };
    
        // Handle single file uploads
        const logo = watch("logo");
        if (logo instanceof File) {
            formData.append("logo", logo);
        }
    
        const video = watch("videos");
        if (video instanceof File) {
            formData.append("videos[]", video);
        }
    
        const picture = watch("pictures");
        if (picture instanceof File) {
            formData.append("pictures[]", picture);
        }
    
        // Append the JSON data
        formData.append("parse", JSON.stringify(formattedData));
    
        // Log FormData contents for debugging
        for (let pair of formData.entries()) {
            console.log('FormData:', pair[0], pair[1]);
        }
    
        mutation.mutate(formData);
    };

    const handlePreview = () => {
        const currentData = {
            business_name: watch("business_name"),
            name: watch("name"),
            email: watch("email"),
            business_gst: watch("business_gst"),
            categories: watch("categories"),
            phone_area: watch("phone_area"),
            phone: watch("phone"),
            address: watch("address"),
            product_services: watch("product_services"),
            url: watch("url"),
            year_established: watch("year_established"),
            logo: watch("logo"),
            keywords: watch("keywords"),
            videos: watch("videos"),
            pictures: watch("pictures"),
        };
        setPreviewData(currentData);
        setShowPreview(true);
    };

    useEffect(() => {
        if (data) {
            reset({
                business_name: data.business_name || '',
                name: {
                    first: data.name.split(" ")[0] || '',
                    middle: data.name.split(" ")[1] || '',
                    last: data.name.split(" ")[2] || '',
                },
                email: data.email || '',
                business_gst: data.business_gst || '',
                categories: data.categories || '',
                phone_area: data.phone_area || '',
                phone: data.phone || '',
                address: {
                    lane1: data.address.lane1 || '',
                    lane2: data.address.lane2 || '',
                    city: data.address.city || '',
                    state: data.address.state || '',
                    pin_code: data.address.pin_code || '',
                    country: data.address.country || ''
                },
                product_services: data.product_services || '',
                url: data.url || '',
                year_established: data.year_established || new Date(),
                keywords: data.keywords || '',
                logo: data.logo || {},
                videos: data.videos || {},
                pictures: data.pictures || {},
            });
        }
    }, [data, reset]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="page-wrapper dashboard">
            <LoginPopup />
            <DashboardHeader />
            <MobileMenu />
            <DashboardEmployerSidebar />
            <section className="user-dashboard">
                <form className="dashboard-outer">
                    <BreadCrumb title="Company Profile!" />
                    <MenuToggler />
                    <BusinessDetail watch={watch} register={register} setValue={setValue} error={errors} />

                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="theme-btn btn-style-one"
                        >
                            Preview
                        </button>
                        <button
                            onClick={handleSubmit(handleRegisterSubmit)}
                            className="theme-btn btn-style-one"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {showPreview && previewData && (
                    <div className="preview-modal">
                        <h4>Preview Data</h4>
                        <div className="preview-content">
                            <p><strong>Business Name:</strong> {previewData.business_name}</p>
                            <p><strong>Name:</strong> {`${previewData.name.first} ${previewData.name.middle} ${previewData.name.last}`}</p>
                            <p><strong>Email:</strong> {previewData.email}</p>
                            <p><strong>GST Number:</strong> {previewData.business_gst}</p>
                            <p><strong>Job Sector:</strong> {previewData.categories?.map((item=>item?.label)).join(", ")}</p>
                            <p><strong>Phone:</strong> ({previewData.phone_area}) {previewData.phone}</p>
                            <p><strong>Address:</strong> {`${previewData.address.lane1}, ${previewData.address.lane2}, ${previewData.address.city}, ${previewData.address.state}, ${previewData.address.pin_code}, ${previewData.address.country}`}</p>
                            <p><strong>Product/Services:</strong> {previewData.product_services}</p>
                            <p><strong>Website URL:</strong> {previewData.url}</p>
                            <p><strong>Year Established:</strong> {previewData.year_established}</p>
                            <p><strong>Keywords:</strong> {previewData.keywords}</p>
                            {/* Display file inputs if they exist */}
                            {Object.keys(previewData.logo).length>0 && <p><strong>Logo:</strong> 
                                <span className="company-logo">
                                <img
                                  src={API_EMPLOYER_PATH + previewData?.logo?.filename}
                                  alt="logo"
                                  width={200}
                                  height={300}
                                />
                              </span></p>}
                            {Object.keys(previewData.videos).length>0 && <p><strong>Videos:</strong> 
                                <span className="company-logo">
                                <img
                                  src={API_EMPLOYER_PATH + previewData?.videos?.filename}
                                  alt="logo"
                                  width={200}
                                  height={300}
                                />
                              </span></p>}
                            {Object.keys(previewData.pictures).length>0 && <p><strong>Pictures:</strong> 
                                <span className="company-logo">
                                <img
                                  src={API_EMPLOYER_PATH + previewData?.pictures?.filename}
                                  alt="logo"
                                    width={200}
                                  height={300}
                                />
                              </span></p>}
                              
                        </div>
                        <button onClick={() => setShowPreview(false)}>Close Preview</button>
                    </div>
                )}

            </section>
            <CopyrightFooter />
        </div>
    );
};

export default index;
