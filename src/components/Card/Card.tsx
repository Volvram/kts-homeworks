import React from "react";

import "./Card.scss";

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
  let classes = "card";

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} onClick={onClick}>
      <img src={image} className="card_image"></img>
      <div className="card_title-and-subtitle">
        <div className="card_title">{title}</div>
        <div className="card_subtitle">{subtitle}</div>
      </div>
      {content}
    </div>
  );
};
