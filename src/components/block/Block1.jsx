

const Block1 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/images/resource/work1.jpeg",
      title: "Integrity",
      text: `Transparent and ethical recruitment practices.`,
    },
    {
      id: 2,
      icon: "/images/resource/work2.jpeg",
      title: "Innovation",
      text: `Leveraging technology to deliver smarter hiring solutions.`,
    },
    {
      id: 3,
      icon: "/images/resource/work4.jpeg",
      title: "Excellence",
      text: `Commitment to delivering top-notch services.`,
    },
    {
      id: 4,
      icon: "/images/resource/work3.jpeg",
      title: "Collaboration",
      text: `Building long-lasting relationships with clients and candidates.`,
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="work-block col-lg-3 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <figure className="image">
              <img
               
                src={item.icon}
                alt="how it works"
              />
            </figure>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block1;
