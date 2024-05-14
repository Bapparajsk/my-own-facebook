import React from 'react';
import Post from "@/components/Post";

const UserPosts = () => {
    return (
        <div className={'w-full h-auto'}>
            <Post
                name={'Bapparaj sk'}
                time={'12-3-2024'}
                userImg={'https://th.bing.com/th/id/OIP.4hjKSvNoStamnhUXbI911wHaEo?&rs=1&pid=ImgDetMain'}
                description={'hi my \n name is\n \t\t bapparaj sk'}
                userActive={true}
                imgSrc={'https://static.vecteezy.com/system/resources/previews/000/443/426/original/hacker-icons-flat-vector.jpg'}
                like={178957600}
                comment={8351597}
                share={456567}
            />
            <Post
                name={'Bapparaj sk'}
                time={'12-1-2024'}
                description={'i am hacker 😎😎😎😎'}
                userImg={'https://th.bing.com/th/id/OIP.4hjKSvNoStamnhUXbI911wHaEo?&rs=1&pid=ImgDetMain'}
                userActive={true}
                imgSrc={'https://adamlevin.com/wp-content/uploads/2013/07/6870002408_154b0c21b9_h.jpg'}
                like={478956}
                comment={5689758}
                share={5908679}
            />
            <Post
                name={'Bapparaj sk'}
                time={'12-1-2024'}
                userImg={'https://th.bing.com/th/id/OIP.4hjKSvNoStamnhUXbI911wHaEo?&rs=1&pid=ImgDetMain'}
                userActive={true}
                description={`I'ts my new look`}
                imgSrc={'https://st.depositphotos.com/1342206/1463/i/950/depositphotos_14634185-stock-photo-hackers-concept-digital-illustration.jpg'}
                like={56456356}
                comment={657}
                share={43}
            />
            <Post
                name={'Bapparaj sk'}
                time={'12-1-2024'}
                description={`this look a wow`}
                userImg={'https://th.bing.com/th/id/OIP.4hjKSvNoStamnhUXbI911wHaEo?&rs=1&pid=ImgDetMain'}
                userActive={true}
                imgSrc={'https://th.bing.com/th/id/R.d8bec481a1b906403762d202477ec730?rik=yfHUN1na5vq2MQ&riu=http%3a%2f%2fgtspirit.com%2fwp-content%2fuploads%2f2018%2f10%2fDivo03.jpg&ehk=jL5UOwLDZS%2bIYGo88DQ9%2fsi1uMhknDLQKWaxdn%2fTOn8%3d&risl=&pid=ImgRaw&r=0'}
                like={56456356}
                comment={464564565}
                share={5634563456}
            />
        </div>
    );
};

export default UserPosts;
