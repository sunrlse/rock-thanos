import React, { Component } from 'react';
import PropTypes from 'prop-types';
const { func } = PropTypes;
import { Button } from 'antd'; 
import './index.less';
import html2canvas from 'html2canvas';

class ResultsList extends Component {
    static propTypes = {
        fetchResults: func
    }

    static defaultProps = {
        results: []
    }

    state = {
        NUM: 32,
        firstCapture: true,
        capture: false,
        currentContent: null
    };

    handleCapture() {
      if (this.state.capture) return;
      this.setState({capture: true})
      if (this.state.firstCapture) {
          this.setState({firstCapture: false})
      }
      let targetItem = document.getElementsByClassName('item')[2],
          targetContent = targetItem.children[0],
          NUM = this.state.NUM
      html2canvas(targetContent).then(canvas => {
        let ctx = canvas.getContext('2d'),
            width = canvas.width,
            height = canvas.height,
            layers = [],
            layerImageDatas = [],
            df = document.createDocumentFragment()

        for (let i = 0; i < NUM; i++) {
            let oCanvas = document.createElement('canvas')
            oCanvas.style.width = width + 'px'
            oCanvas.style.height = height + 'px'
            let oCtx = oCanvas.getContext('2d')
            let oImageData = oCtx.createImageData(width, height)
            let len = oImageData.data.length
            for (let i = 0; i < len; i++) {
              oImageData.data[i] = 255
            }
            layers.push(oCanvas)
            layerImageDatas.push(oImageData)
        }

        let imageData = ctx.getImageData(0, 0, width, height)
        let pixelData = imageData.data.slice()
        for (let i = 0, l = pixelData.length; i < l; i += 4) {
            let idx = this.getRandomIndex(NUM)
            let currImageData = layerImageDatas[idx]
            currImageData.data[i] = pixelData[i]
            currImageData.data[i + 1] = pixelData[i + 1]
            currImageData.data[i + 2] = pixelData[i + 2]
            currImageData.data[i + 3] = pixelData[i + 3]
        }

        for (let i = 0; i < NUM; i++) {
            let layer = layers[i]
            let ct = layer.getContext('2d')
            ct.putImageData(layerImageDatas[i], 0, 0)
            df.appendChild(layer)
        }

        targetItem.appendChild(df)
        targetContent.classList.add('hide')
        targetContent.classList.remove('recover')
        this.setState({capture: false, currentContent: targetContent})
      })
    
    }

    handleRecover() {
      let targetContent = this.state.currentContent
      targetContent.classList.add('recover')
      let t = setTimeout(() => {
          targetContent.classList.remove('hide')
          clearTimeout(t)
      }, 500);
      let targetItem = targetContent.parentNode
      let canvass = targetItem.getElementsByTagName('canvas')
      canvass = Array.prototype.slice.call(canvass)
      for (let c of canvass) {
        targetItem.removeChild(c)
      }
      this.setState({
        currentContent: null
      })
    }

    getRandomIndex(max) {
      let num = Math.floor(Math.random() * max)
      return num
    }

    componentWillMount() {
        this.props.fetchResults();
    }

    render() {
        const { results } = this.props;

        return (
            <div>
                <Button type="primary" onClick={this.handleCapture.bind(this)}
                  loading={!this.state.firstCapture && this.state.capture}>capture</Button><br/>
                <Button type="default" onClick={this.handleRecover.bind(this)}>recover</Button>
                {results && results.map((item, index) => {
                  return (
                    <div className={'item'} key={index}>
                      <div className={'content'}>
                        <p>{item.title}</p>
                        <p>{item.id} {item.title}</p>
                        {/* <p><span style={{display: 'block', width:'5px', height:'5px',borderRadius: '50%',background: '#ad12f3'}}></span></p> */}
                      </div>
                    </div>
                  )
                })}
            </div>
        );
    }
}

export default ResultsList;