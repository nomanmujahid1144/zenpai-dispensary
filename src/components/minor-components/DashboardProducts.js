import { SlickSlider } from '../minor-components/SlickSlider'
import { Card } from '../minor-components/Card'
import { baseURL } from '../../constants/baseURL';
import { Link } from 'react-router-dom';
import { SinglDashboardProduct } from './SinglDashboardProduct';

export const DashboardProducts = (props) => {
    console.log('these are props : ', props)

    return (
        <>
            <div className='flex'>
                    {props.istype === 'categories' ?
                    
                        <SinglDashboardProduct products={props.products} istype='categories'/>
                    :
                        <SinglDashboardProduct products={props.products} istype='brand' brand={props.brand} handleItem={props.handleItem} />
                }
                {props.isBlogType ?
                    <SinglDashboardProduct blogs={props.blogs} isBlogType={true} />
                :null}
                
            </div>
        </>
    )
}