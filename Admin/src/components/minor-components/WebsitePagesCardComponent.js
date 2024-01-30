import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const WebsitePagesCardComponent = (props) => {

    return (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FontAwesomeIcon className="text-myBg pb-3" icon={props.iconName} size="2xl" />
            <Link to={props.link}>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {props.componentName}
                </h5>
            </Link>
        </div>
    )
}