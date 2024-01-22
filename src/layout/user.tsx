import NavUser from "@/components/containers/NavUser";

interface children {
  children: React.ReactNode;
}
const LayoutUser = ({children}:children) => {
  return (
    <>
      <NavUser />
      {children}
    </>
  )
}

export default LayoutUser;