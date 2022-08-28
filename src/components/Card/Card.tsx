import React from "react";

import styleCard from "./Card.module.scss";

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
  let classes = `${styleCard.card}`;

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} onClick={onClick}>
      <img src={image} className={styleCard.card_image}></img>
      <div className={styleCard.card_titleAndSubtitle}>
        <div className={styleCard.card_title}>{title}</div>
        <div className={styleCard.card_subtitle}>{subtitle}</div>
      </div>
      {content}
    </div>
  );
};
