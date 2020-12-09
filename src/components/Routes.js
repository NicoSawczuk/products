import React from 'react'
import { Route, Switch } from "wouter";
import Home from '../pages/Home'

export default function Routes() {
    return (
        <>
            <Switch>
                <Route component={Home} path="/" />
            </Switch>
        </>
    )
}