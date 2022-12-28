import React, { useState } from 'react'

const Signin = () => {
	const [userData, setUserData] = useState({
		fname: '',
		lname: '',
		phone: '',
		email: '',
		password: '',
	})

	return (
		<div>
			<form>
				<input
					type='text'
					name='fname'
				/>
				<input
					type='text'
					name='lname'
				/>
				<input
					type='number'
					name='phone'
				/>

				<input
					type='email'
					name='email address'
				/>
				<input
					type='password'
					name='password'
				/>
				<input
					type='password'
					name='confirm password'
				/>
        <button>Signin</button>
			</form>
		</div>
	)
}

export default Signin
