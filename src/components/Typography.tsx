import React from "react";
// always using p is certainly not the best way to do this

const styles = {
  h1: "inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200  bg-clip-text font-display text-5xl leading-loose tracking-tight text-transparent",
  p: "mt-1 text-sm text-slate-400",
  h2: "mt-1 font-display text-base text-white",
  h3: "",
  h4: "",
  h5: "",
};

type TypographyProps = {
  variant?: keyof typeof styles;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

const Typography = ({ variant = "p", children, ...props }: TypographyProps) => {
  return (
    <p className={styles[variant]} {...props}>
      {children}
    </p>
  );
};

export default Typography;
