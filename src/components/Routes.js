import React from 'react'
import { Route, Switch } from "wouter";
import Home from '../pages/Home'
import Users from '../pages/Users'

export default function Routes() {
    return (
        <>
            <Switch>
                <Route component={Home} path="/" />
                <Route component={Users} path="/users" />
            </Switch>
        </>
    )
}