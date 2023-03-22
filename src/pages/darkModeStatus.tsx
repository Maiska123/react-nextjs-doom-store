const DarkModeStatus = ({darkmode}: {darkmode: boolean})=> {

  return darkmode ? <>{'Dark'}</> : <>{'Light'}</>;
};

export default DarkModeStatus;
