import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { store } from './store';

import Login from './components/Login';
import Main from './components/Main';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Authenticate from './components/Authenticate';
import './css/style.css';
import Reservation from './components/reservation/Reservation';
import Customer from './components/customer/Customer';
import Facility from './components/facility/Facility';
import localDataSetup from './apis/localdata';

/*
ReactDOM.render(
    <Login />,
    document.getElementById('root')
);
*/

const history = createBrowserHistory();
 
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          // refetchOnWindowFocus=trueのとき、WindowsにFocusが来るとfetchする
          refetchOnWindowFocus: false,
    
          // refetchOnWindowFocus=trueのとき、
          // Focusが外れてもstaleTime以内ならrefetchしない
          // staleTime: 1 * 60 * 1000,
    
          // サスペンスを使うには <Suspense/>が必要
          suspense: false,
        }
    }
});

localDataSetup();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <Provider store={store}>

                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <Route excat path='/main'>
                            <Reservation />
                        </Route>
                        <Route excat path='/reservation'>
                            <Reservation />
                        </Route>                    
                        <Route excat path='/reservation/:id/edit'>
                            <Reservation />
                        </Route>                    
                        <Route excat path='/customer'>
                            <Customer />
                        </Route>                    
                        <Route excat path='/facility'>
                            <Facility />
                        </Route>                    
                    </Switch>                
                </BrowserRouter>
            </Provider>
        </QueryClientProvider >
    </React.StrictMode>
    ,
    document.getElementById('root')
);

