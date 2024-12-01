import PostJob from "@/components/dashboard-pages/admin-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const PostJobsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PostJob />
    </>
  );
};

export default PostJobsEmploeeDBPage;
