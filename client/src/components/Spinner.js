const Spinner = ({splash = "Loading..."}) => {
    return(
        <div class="spinner-grow text-secondary" role="status" style={{width:"80px", height:"80px", margin: "auto", textAlign: "center" }}>
  <span class="sr-only">{splash}</span>
</div>
    )
};

export default Spinner;