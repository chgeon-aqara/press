import { press } from "@lib/press";

export namespace deco {

    export function land() {
        return {
            wrap: press.style.relative()
                .block( '100vw', '100vh' )
                .flex()
                .add( {
                    flexDirection: 'column',
                    border: '1px solid red',
                    background: `radial-gradient(
                        rgba(85, 25, 65, 0.5),
                        rgba(255, 255, 255, 0)
                    )`
                }),

            head: press.style.relative().flex()
                .add( { 
                    cursor: 'pointer',        
                    marginLeft: 0
                } ),

            desc: press.style.relative()
                .add( { 
                    fontSize: 12,
                    margin: '0px 12px 70px'
                } )
        }
     
    }

    export function headImage() {
        return press.style.relative()
    }

}