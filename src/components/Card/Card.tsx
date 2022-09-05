import React from "react";

import cn from "classnames";
import cnBind from "classnames/bind";

import styles from "./styles.module.scss";

const cx = cnBind.bind(styles);

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode | string;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode | string;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;

  className?: string;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  className,
}) => {
  const classNames = cx({ card: true });

  return (
    <div className={cn(classNames, className)} onClick={onClick}>
      <img src={image} className={styles.card_image} alt="" />
      <div className={styles.card_titleAndSubtitle}>
        <div className={styles.card_title}>{title}</div>
        <div className={styles.card_subtitle}>{subtitle}</div>
      </div>
      {content}
    </div>
  );
};
