const Homepage = (props) => {

  return null;
}


export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: `/${context.locale}/launchverse/`,
      permanent: false
    }
  }
}

export default Homepage;
