export const QSTottleStyle = `
.qs-toggle {
  display: flex;
  padding-bottom: 8px;
}
.qs-toggle-title {
  margin-left: 8px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 20px;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 2px;
  right: 2px;
  bottom: 0px;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.switch .slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
.switch input:checked+.slider {
  background-color: #2196F3;
}
.switch input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}
.switch input:checked+.slider:before {
  transform: translateX(20px);
}`;