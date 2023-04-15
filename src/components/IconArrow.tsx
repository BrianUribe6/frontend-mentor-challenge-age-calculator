function IconArrow(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="0.957em"
      viewBox="0 0 46 44"
      {...props}
    >
      <g fill="none" stroke="#FFF">
        <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
      </g>
    </svg>
  );
}

export default IconArrow;
