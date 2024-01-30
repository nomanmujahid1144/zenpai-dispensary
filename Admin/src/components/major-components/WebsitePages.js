import { useSelector } from "react-redux";
import { Loader } from "../minor-components/Loader";
import { WebsitePagesCardComponent } from "../minor-components/WebsitePagesCardComponent";

export const WebsitePages = () => {
    const components = [
        { name: "Header Slider / Bottom Image", iconName: "fa-solid fa-image", link: "/pages/header-image" },
        { name: "Top Message", iconName: "fa-solid fa-bullhorn", link: "/pages/announcement" },
        { name: "About Us", iconName: "fa-solid fa-address-card", link: "/pages/about-us" },
        { name: "Delivery", iconName: "fa-solid fa-truck", link: "/pages/delivery" },
        { name: "FAQ", iconName: "fa-solid fa-question", link: "/pages/faqs" },
        { name: "Add Blogs", iconName: "fa-solid fa-square-rss", link: "/pages/blog" },
        { name: "Add Category Banner", iconName: "fa-solid fa-flag", link: "/pages/category-banner" },
        { name: "Change Social Links", iconName: "fa-solid fa-share-nodes", link: "/pages/social-link" }
    ]

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    return (

        <div className=" z-0">
            {!loading ? (
                <div className=" my-32  ml-[20%] w-[78%]">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                        {components.map((comp, index) => (
                            <WebsitePagesCardComponent componentName={comp.name} iconName={comp.iconName} link={comp.link} />
                        ))}
                    </div>

                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}