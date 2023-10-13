import { FC } from "react";
import './spinner.scss';
const SmallSpinner: FC = () => {
    return (
        <div className="spinner spinner-sm">
            <svg viewBox="0 0 100 100">
                <defs>
                    <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
                        floodColor="#fc6767"/>
                    </filter>
                </defs>
                <circle id="spinner" cx="50" cy="50" r="45"/>
            </svg>
        </div>
    )
};
export default SmallSpinner;