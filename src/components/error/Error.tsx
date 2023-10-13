import { FC } from "react";
import { Icon } from '@iconify/react';
import './error.scss';

// Обработка ошибок

const Error: FC = () => {
    return (
        <div className="error">
            <br />
            <Icon icon="system-uicons:warning-circle" />
            <h4>
                An error occurred while loading data.
            </h4>
        </div>
    )
}
export default Error;