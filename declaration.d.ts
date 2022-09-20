declare module '*.ts';

declare module '*.scss'{
 const content: Record<string, string>;
 export default content;
}
declare module 'classnames';
declare module 'paginate-array';

// Images declared
declare module '*.svg'{
 const content: string;
 export default content;
}
declare module '*.png'{
 const content: string;
 export default content;
}
declare module '*.jpg'{
 const content: string;
 export default content;
}
declare module '*.jpeg'{
 const content: string;
 export default content;
}