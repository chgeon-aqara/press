import { press } from "@lib/press";

export namespace deco {

    export function land() {
        return {
            wrap: press.style.relative()
                .block( '100vw', '100vh' )
                .flex(undefined, 'center')
                .add( {
                    flexDirection: 'column',
                    background: `radial-gradient(
                        rgba(35, 155, 105, 0.3),
                        rgba(255, 255, 255, 0)
                    )`
                }),

            head: press.style.relative().flex()
                .add( { 
                    cursor: 'pointer',        
                    marginLeft: -100
                } ),

            desc: press.style.relative()
                .add( { 
                    maxWidth: 430,
                    fontSize: 12,
                    margin: '0px 12px 70px'
                } )
        }
     
    }

    export function headImage() {
        return press.style.relative()
    }

}