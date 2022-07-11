function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');


  function handle(){
    let user = null;

    const url = `/account/deposit/${email}/${amount}}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data)
      user=data;

      if(user==null){
        props.setStatus('fail!')
      }else{
        props.setStatus('');
        props.setShow(false);
      }
    })();

    // console.log(email,amount);
    // const user = ctx.users.find((user) => user.email == email);
    // if (!user) {
    //   props.setStatus('fail!');
    //   return;      
    // }

    // user.balance = user.balance + Number(amount);
    // console.log(user);
    // props.setStatus('');      
    // props.setShow(false);
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}