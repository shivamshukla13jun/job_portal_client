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

const index = () => {
    const userInfo = useUserInfo();

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
            pan_card: '',
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

        const name = `${data.name.first} ${data.name.middle} ${data.name.last}`;
        const formattedData = {
            business_name: data.business_name,
            business_gst: data.business_gst,
            pan_card: data.pan_card,
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
            year_established: data.year_established,
            logo: data.logo,
            videos: data.videos,
            pictures: data.pictures
        }

        formData.append("parse", JSON.stringify(formattedData))

        formData.append("logo", watch("logo"));
        formData.append("video[]", watch("videos"));
        formData.append("picture[]", watch("pictures"));

        mutation.mutate(formData);
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
                pan_card: data.pan_card || '',
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

        return () => {
            reset();
        }

    }, [data, reset]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const errorArray = Object.entries(errors);
            toast.error(errorArray[0][1].message)
        }
    }, [errors])

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            {/* <!-- Header Span for hight --> */}

            <LoginPopup />
            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

            <DashboardEmployerSidebar />
            {/* <!-- End User Sidebar Menu --> */}

            {/* <!-- Dashboard --> */}
            <section className="user-dashboard">
                <form className="dashboard-outer" >
                    <div className="dashboard-outer">
                        <BreadCrumb title="Company Profile!" />
                        {/* breadCrumb */}

                        <MenuToggler />
                        {/* Collapsible sidebar button */}

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="ls-widget">
                                    <div className="tabs-box">
                                        <div className="widget-title">
                                            <h4>Business Details</h4>
                                        </div>
                                        <div className="widget-content">
                                            <BusinessDetail watch={watch} register={register} setValue={setValue} error={errors} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Business Details --> */}

                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    onClick={handleSubmit(handleRegisterSubmit)}
                                    className="theme-btn btn-style-one"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        {/* End .row */}
                    </div>
                    {/* End dashboard-outer */}
                </form>

            </section>
            {/* <!-- End Dashboard --> */}

            <CopyrightFooter />
            {/* <!-- End Copyright --> */}
        </div>
        // End page-wrapper
    );
};

export default index;
