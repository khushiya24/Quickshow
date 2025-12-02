
// const BlurCircle = ({top="auto", left="auto", right="auto", bottom="auto"}) => {
//   return (
//     <div className="absolute -z-50 h-58 w-58 aspects-square rounded-full bg-primary/30 blur-3xl"
//     style={{top:top, left:left, right:right, bottom:bottom}}>
      
//     </div>
//   )
// }

// export default BlurCircle

const BlurCircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) => {
  return (
    <div
      className="absolute -z-20 h-[230px] w-[230px] aspect-square rounded-full bg-primary/30 blur-3xl"
      style={{ top, left, right, bottom }}
    ></div>
  );
};

export default BlurCircle;
