import React from 'react';
import styles from './styles.module.scss';
import cn from "classnames";

import loader_s from "assets/img/loader_s.svg";
import loader_m from "assets/img/loader_m.svg";
import loader_l from "assets/img/loader_l.svg";
import { log } from 'utils/log';

export enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
}

type LoaderProps = {
    loading?: boolean;
    size?: LoaderSize;
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({loading = true, size = LoaderSize.m, className}) => {

    let source = loader_m;

    React.useEffect(() => {
        if (size === LoaderSize.s){
            source = loader_s;
        }else if (size === LoaderSize.l){
            source = loader_l;
        }
    }, [size]);

    const classnames = cn(styles.loader, className);
    return (
        <>
            {loading && <div className={classnames}><img src={source} alt="loading"></img></div>}
        </> 
    );
}

export default Loader;