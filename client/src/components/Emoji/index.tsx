export const Emoji = ({ children }: { children: React.ReactNode }) => {
  const emoji = ["(·_·)", "(;-;)", "(^-^*)", "(o^^)o", "(o_o)/", "(˚Δ˚)b"];

  return (
    <tr className="flex flex-col items-center justify-center gap-5 py-4 md:gap-20 md:pt-20">
      <td className="text-5xl sm:text-5xl lg:text-8xl">
        {emoji[Math.floor(Math.random() * emoji.length)]}
      </td>
      <td className="text-xl">{children}</td>
    </tr>
  );
};
