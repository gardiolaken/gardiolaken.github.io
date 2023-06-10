import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-bst-visualization',
  templateUrl: './bst-visualization.component.html',
  styleUrls: ['./bst-visualization.component.css']
})
export class BstVisualizationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }



  doc1 = `
  else if (node.data > newNode.data) { // go left ---------------
    log(0, node.data + " is GREATER than " + newNode.data + ". Go Left")
        if (node.left === null) {

        newNode.parent = node;           //assigning object attributes
        newNode.position = 0;
        newNode.y = node.y + 100;
        newNode.level = node.level + 1;

        if (newNode.level > 3) {        //limit bst level to 3
            log(1, "Constraint: BST max level is set to 3")
            document.getElementById("addNodeButton").disabled = false;
        }
        else {
            if (newNode.level > this.bst_level) {    //remap BST coordinates in canvas
                this.bst_level = newNode.level;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                this.mapBST(this.root);

                //draw parent connect
                this.connectToRoot(node);
            }

        node.left = newNode;


         //equation to calculate dynamic x coordinates of nodes
        let temp = (Math.pow(2, (this.bst_level - node.level - 1)) * 80);
        let baseX, baseY, toX, toY = null;
        newNode.x = node.x - temp;

        //animate

        await animateExpand(node.x, node.y);
        await animateClose(node.x, node.y);
        await animateline(node.x, node.y, newNode.x, newNode.y);
document.getElementById("addNodeButton").disabled = false;
  `

  doc2 = `
  async function animateExpand(x, y) {
    return new Promise(async (resolve, reject) => {
        var pos = 0;
        var id = setInterval(frame, 10)

        async function frame() {
            if (pos >= 9) {
                clearInterval(id);
                resolve("expand done")
            }
            else {
                pos = pos + 0.1;
                ctx.beginPath();
                ctx.strokeStyle = 'Aquamarine';
                ctx.arc(x, y, 16 + pos, 0 * Math.PI, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
}

async function animateClose(x, y) {
    return new Promise(async (resolve, reject) => {
        var pos = 10;
        var id = setInterval(frame, 10)

        async function frame() {
            if (pos <= 0) {
                clearInterval(id);
                resolve("closeAnimate done");

            }
            else {
                pos = pos - 0.1;
                ctx.beginPath();
                ctx.strokeStyle = 'white';
                ctx.arc(x, y, 16 + pos, 0 * Math.PI, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
}

async function animateline(baseX, baseY, toX, toY) {
    return new Promise(async (resolve, reject) => {
        var direction = null;
        if (toX < baseX) {
            //go left
            direction = -1;
            baseX = baseX - 15;
            baseY = baseY + 15;
            toX = toX + 15;
            toY = toY - 15;
        }
        else {
            direction = 1;
            baseX = baseX + 15;
            baseY = baseY + 15;
            toX = toX - 15;
            toY = toY - 15;
        }
        var timer = 0;
        var id = setInterval(frame, 10);
        var adjustedX = toX - baseX;
        var adjustedY = toY - baseY;
        adjustedY = Math.abs(adjustedY / 100);
        adjustedX = Math.abs(adjustedX / 100);

        async function frame() {
            if (timer == 100) {
                clearInterval(id);
                resolve("animateline done");
            }
            else {

                timer++;
                console.log(baseX, baseY, toX, toY)
                baseX = baseX + (direction * adjustedX);;
                baseY = baseY + adjustedY;
                ctx.strokeStyle = 'Aquamarine';
                ctx.beginPath();
                ctx.moveTo(baseX + (2 * direction), baseY - 2);
                ctx.lineTo(baseX + (2 * direction * -1), baseY + 2);
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
}
  `

  doc3 = `async function animateline2(baseX, baseY, toX, toY, speed) {
    return new Promise(async (resolve, reject) => {
        var direction = null;
        if (toX < baseX) {
            //go left
            direction = -1;
            baseX = baseX - 15;
            baseY = baseY + 15;
            toX = toX + 15;
            toY = toY - 15;
        }
        else {
            direction = 1;
            baseX = baseX + 15;
            baseY = baseY + 15;
            toX = toX - 15;
            toY = toY - 15;
        }
        var timer = 0;
        var id = setInterval(frame, speed);
        var adjustedX = toX - baseX;
        var adjustedY = toY - baseY;
        adjustedY = Math.abs(adjustedY / 100);
        adjustedX = Math.abs(adjustedX / 100);

        async function frame() {
            if (timer == 100) {
                clearInterval(id);
                resolve("animateline done");
            }
            else {

                timer++;
                console.log(baseX, baseY, toX, toY)
                baseX = baseX + (direction * adjustedX);;
                baseY = baseY + adjustedY;
                ctx2.strokeStyle = 'Blue';
                ctx2.beginPath();
                ctx2.moveTo(baseX + (5 * direction), baseY - 5);
                ctx2.lineTo(baseX + (5 * direction * -1), baseY + 5);
                ctx2.stroke();
                ctx2.closePath();
            }
        }
    })
}`
  doc4 = `//Author : Kenneth Gardiola
  //Date   : 2021

  var startY = 30;
  var x = 0;
  var y = 0;
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight * 0.50;

  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.font = "20px Arial";


  class Node {
      constructor(data) {
          this.data = data;
          this.x = null;
          this.y = null;
          this.left = null;
          this.right = null;
          this.position = null; // left(0) or right(1) - needed to dynamically adjust position of leaf node. x-axis changes. adding new level require x-axis adjustment to fit and not overlap nodes
          this.parent = null;
          this.level = null;
      }
  }

  class BinarySearchTree {
      constructor() {
          this.root = null;
          this.bst_level = null;
      }


      async insert(data) {
          //clear canvas
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          //disable button until animation finish
          document.getElementById("addNodeButton").disabled = true;
          this.mapBST(this.root);
          var newNode = new Node(data);

          if (this.root === null) {
              this.root = newNode;
              this.bst_level = 0;
              newNode.level = 0;
              newNode.x = ctx.canvas.width / 2 - 30;
              newNode.y = startY;
              createCircle(newNode.x, newNode.y, newNode.data);
              document.getElementById("addNodeButton").disabled = false;
              await animateExpand(newNode.x, newNode.y);

              log(0, "Root Node Created");

          }
          else {
              this.insertNode(this.root, newNode);
          }
      }


      async insertNode(node, newNode) {

          //if data = data
          if (node.data == newNode.data) {
              //TODO
              log(0, "Values equals each other")
              document.getElementById("addNodeButton").disabled = false;
          }
          else if (node.data > newNode.data) { // go left ---------------
              log(0, node.data + " is GREATER than " + newNode.data + ". Go Left")
              if (node.left === null) {

                  newNode.parent = node;
                  newNode.position = 0;
                  newNode.y = node.y + 100;
                  newNode.level = node.level + 1;

                  if (newNode.level > 3) {  //limit bst level to 3
                      log(1, "Constraint: BST max level is set to 3")
                      document.getElementById("addNodeButton").disabled = false;
                  }
                  else {
                      if (newNode.level > this.bst_level) { //remap BST coordinates
                          this.bst_level = newNode.level;
                          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                          this.mapBST(this.root);
                          //draw connect to parent until root
                          this.connectToRoot(node);
                      }

                      node.left = newNode;

                      //new
                      let temp = (Math.pow(2, (this.bst_level - node.level - 1)) * 80);
                      let baseX, baseY, toX, toY = null;
                      newNode.x = node.x - temp;

                      //animate

                      await animateExpand(node.x, node.y);
                      await animateClose(node.x, node.y);
                      await animateline(node.x, node.y, newNode.x, newNode.y);


                      log(0, "Node " + newNode.data + " added.")



                      connectCircle(baseX, baseY, toX, toY);
                      createCircle(newNode.x, newNode.y, newNode.data);
                      await animateExpand(newNode.x, newNode.y);
                      createCircle(newNode.x, newNode.y, newNode.data);
document.getElementById("addNodeButton").disabled = false;
                  }


              }
              else {
                  await animateExpand(node.x, node.y);
                  await animateClose(node.x, node.y);
                  await animateline(node.x, node.y, node.left.x, node.left.y)
                  this.insertNode(node.left, newNode);
              }
          }

          else {                                                      // go right --------------
              log(0, node.data + " is LESS than " + newNode.data + ". Go Right")
              if (node.right === null) {

                  newNode.parent = node;
                  newNode.position = 1;
                  newNode.y = node.y + 100;
                  newNode.level = node.level + 1;
                  if (newNode.level > 3) {  //limit bst level to 3
                      log(1, "Constraint: BST max level is set to 3")
                      document.getElementById("addNodeButton").disabled = false;
                  }
                  else {
                      if (newNode.level > this.bst_level) {
                          this.bst_level = newNode.level;
                          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                          this.mapBST(this.root);
                          this.connectToRoot(node);
                      }

                      node.right = newNode;


                      let temp = (Math.pow(2, (this.bst_level - node.level - 1)) * 80);
                      let baseX, baseY, toX, toY = null;
                      newNode.x = node.x + temp;

                      //animation
                      await animateExpand(node.x, node.y);
                      await animateClose(node.x, node.y);
                      await animateline(node.x, node.y, newNode.x, newNode.y);

                      log(0, "Node " + newNode.data + " added.")

                      connectCircle(baseX, baseY, toX, toY);
                      createCircle(newNode.x, newNode.y, newNode.data);
                      await animateExpand(newNode.x, newNode.y);
                      createCircle(newNode.x, newNode.y, newNode.data);
document.getElementById("addNodeButton").disabled = false;
                  }

              }
              else {
                  await animateExpand(node.x, node.y);
                  await animateClose(node.x, node.y);
                  await animateline(node.x, node.y, node.right.x, node.right.y);
                  this.insertNode(node.right, newNode);
              }
          }

      }


      mapBST(node) {
          if (node !== null) {

              if (this.root !== node) {
                  let temp = (Math.pow(2, (this.bst_level - node.parent.level - 1)) * 80);
                  if (node.position == 0) {
                      node.x = node.parent.x - temp;
                  }
                  else {
                      node.x = node.parent.x + temp;
                  }
                  createCircle(node.x, node.y, node.data);
                  connectCircle(node.parent.x,node.parent.y,node.x, node.y);

              }
              else {
                  //draw root node
                  createCircle(node.x, node.y, node.data);
              }
              this.mapBST(node.left);
              this.mapBST(node.right);
          }

      }

      connectToRoot(node) {

          if (this.root !== node) {

              let baseX, baseY, toX, toY = null;
              if (node.position == 0) {
                  baseX = node.parent.x - 15;
                  baseY = node.parent.y + 15;
                  toX = node.x + 15;
                  toY = node.y - 15;
              }
              else {
                  baseX = node.parent.x + 15;
                  baseY = node.parent.y + 15;
                  toX = node.x - 15;
                  toY = node.y - 15;
              }
              ctx.beginPath();
              ctx.strokeStyle = 'Aquamarine';
              ctx.moveTo(baseX, baseY);
              ctx.lineTo(toX, toY);
              ctx.lineWidth = 5;
              ctx.stroke();
              ctx.closePath();
              ctx.lineWidth = 1;
              connectCircle(node.parent.x, node.parent.y, node.x, node.y);
              this.connectToRoot(node.parent);
          }
          else {
              console.log("reached root");
          }

      }

  }

  function addNode() {
      let nodeName = parseInt(document.getElementById("node").value);
      console.log("inserting" + nodeName);
      BST.insert(nodeName);
  }

  function createCircle(x, y, number) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.fillText(number, x - 10, y + 8)


      ctx.arc(x, y, 15, 0 * Math.PI, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
  }

  function connectCircle(baseX, baseY, toX, toY) {
      if (toX < baseX) {
          //go left
          baseX = baseX - 15;
          baseY = baseY + 15;
          toX = toX + 15;
          toY = toY - 15;
      }
      else {
          baseX = baseX + 15;
          baseY = baseY + 15;
          toX = toX - 15;
          toY = toY - 15;
      }

      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      ctx.closePath();
  }

  //animation

  async function animateExpand(x, y) {
      return new Promise(async (resolve, reject) => {
          var pos = 0;
          var id = setInterval(frame, 10)

          async function frame() {
              if (pos >= 9) {
                  clearInterval(id);
                  resolve("expand done")
              }
              else {
                  pos = pos + 0.1;
                  ctx.beginPath();
                  ctx.strokeStyle = 'Aquamarine';
                  ctx.arc(x, y, 16 + pos, 0 * Math.PI, 2 * Math.PI);
                  ctx.stroke();
                  ctx.closePath();
              }
          }
      })
  }

  async function animateClose(x, y) {
      return new Promise(async (resolve, reject) => {
          var pos = 10;
          var id = setInterval(frame, 10)

          async function frame() {
              if (pos <= 0) {
                  clearInterval(id);
                  resolve("closeAnimate done");

              }
              else {
                  pos = pos - 0.1;
                  ctx.beginPath();
                  ctx.strokeStyle = 'white';
                  ctx.arc(x, y, 16 + pos, 0 * Math.PI, 2 * Math.PI);
                  ctx.stroke();
                  ctx.closePath();
              }
          }
      })
  }

  async function animateline(baseX, baseY, toX, toY) {
      return new Promise(async (resolve, reject) => {
          var direction = null;
          if (toX < baseX) {
              //go left
              direction = -1;
              baseX = baseX - 15;
              baseY = baseY + 15;
              toX = toX + 15;
              toY = toY - 15;
          }
          else {
              direction = 1;
              baseX = baseX + 15;
              baseY = baseY + 15;
              toX = toX - 15;
              toY = toY - 15;
          }
          var timer = 0;
          var id = setInterval(frame, 10);
          var adjustedX = toX - baseX;
          var adjustedY = toY - baseY;
          adjustedY = Math.abs(adjustedY / 100);
          adjustedX = Math.abs(adjustedX / 100);

          async function frame() {
              if (timer == 100) {
                  clearInterval(id);
                  resolve("animateline done");
                  //animatelineback()
              }
              else {
                  timer++;
                  console.log(baseX, baseY, toX, toY)
                  baseX = baseX + (direction * adjustedX);;
                  baseY = baseY + adjustedY;
                  ctx.strokeStyle = 'Aquamarine';
                  ctx.beginPath();
                  ctx.moveTo(baseX + (2 * direction), baseY - 2);
                  ctx.lineTo(baseX + (2 * direction * -1), baseY + 2);
                  ctx.stroke();
                  ctx.closePath();
              }
          }
      })


  }

  function log(type, msg) {
      if (type == 0) {
          document.getElementById("bst_logs").className = "alert bst_alert fade show hide alert-success"
      }
      else {
          document.getElementById("bst_logs").className = "alert bst_alert fade show hide alert-danger"
      }
      document.getElementById("bst_logs").innerHTML = msg;
      $('#bst_logs').show();
  }


  var BST = new BinarySearchTree();





  //docs examples
  var canvas2 = document.getElementById('animate_line_example');
  var ctx2 = canvas2.getContext('2d');
  ctx2.canvas.width = window.innerWidth * 0.30;
  ctx2.canvas.height = window.innerHeight * 0.25;

  function changespeed() {
      ctx2.clearRect(0,0,ctx2.canvas.width,ctx2.canvas.height)
      let speed = parseInt(document.getElementById("example_line").value);
      animateline2(20, 20, ctx2.canvas.width - 20, 200, speed);
  }

  async function animateline2(baseX, baseY, toX, toY, speed) {
                      return new Promise(async (resolve, reject) => {
                          var direction = null;
                          if (toX < baseX) {
                              //go left
                              direction = -1;
                              baseX = baseX - 15;
                              baseY = baseY + 15;
                              toX = toX + 15;
                              toY = toY - 15;
                          }
                          else {
                              direction = 1;
                              baseX = baseX + 15;
                              baseY = baseY + 15;
                              toX = toX - 15;
                              toY = toY - 15;
                          }
                          var timer = 0;
                          var id = setInterval(frame, speed);
                          var adjustedX = toX - baseX;
                          var adjustedY = toY - baseY;
                          adjustedY = Math.abs(adjustedY / 100);
                          adjustedX = Math.abs(adjustedX / 100);

                          async function frame() {
                              if (timer == 100) {
                                  clearInterval(id);
                                  resolve("animateline done");
                              }
                              else {

                                  timer++;
                                  console.log(baseX, baseY, toX, toY)
                                  baseX = baseX + (direction * adjustedX);;
                                  baseY = baseY + adjustedY;
                                  ctx2.strokeStyle = 'Blue';
                                  ctx2.beginPath();
                                  ctx2.moveTo(baseX + (5 * direction), baseY - 5);
                                  ctx2.lineTo(baseX + (5 * direction * -1), baseY + 5);
                                  ctx2.stroke();
                                  ctx2.closePath();
                              }
                          }
                      })
  }
`
}
