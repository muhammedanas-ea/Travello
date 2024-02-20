

// eslint-disable-next-line react/prop-types
export default function SingleProperty({props}) {
  // eslint-disable-next-line react/prop-types
  
  return (
    <div className="grid grid-cols-5 grid-rows-4 gap-3">
      <div className="col-span-3 row-span-4">
        <div>
          <img
            className="object-cover h-[500px] w-full rounded-md"
            
            // eslint-disable-next-line react/prop-types
            src={props ? `${import.meta.env.VITE_USER_URL}/files/${props[0]}` : "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D"}
            alt=""
          />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-4">
        <div>
          <img
            className="object-cover h-[248px] w-full rounded-md"
            // eslint-disable-next-line react/prop-types
            src={props ? `${import.meta.env.VITE_USER_URL}/files/${props[1]}` :"https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D"}
            alt=""
          />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-3">
        <div>
          <img
            className="object-cover h-[242px] w-full rounded-md"
            // eslint-disable-next-line react/prop-types
            src={props ? `${import.meta.env.VITE_USER_URL}/files/${props[2]}` :"https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
