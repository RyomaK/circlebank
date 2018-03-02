package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	imageupload "github.com/olahol/go-imageupload"
	"github.com/ryomak/circlebank/model"
)

type Admin struct {
	DB *sql.DB
}

func (a *Admin) Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

func (a *Admin) AdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	q := r.URL.Query()
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		page = 1
	}
	circles, err := model.GetCircles(a.DB, page)
	fmt.Printf("ffaf\n")
	if err != nil {
		log.Printf("adminCircle err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	res, err := json.Marshal(circles)
	if err != nil {
		log.Printf("Marshal %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(res)
}

func (a *Admin) AdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	q := r.URL.Query()
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		page = 1
	}
	events, err := model.GetEvents(a.DB, page)
	if err != nil {
		log.Printf("adminCircle err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		res, _ := json.Marshal(status)
		w.Write(res)
	} else {
		if events == nil{
			status := StatusCode{Code: http.StatusOK, Message: "not found"}
			res, _ := json.Marshal(status)
			w.Write(res)
		}
		res, err := json.Marshal(events)
		if err != nil {
			log.Printf("Marshal %v", err)
		}
		w.Write(res)
	}
}

func (a *Admin) AdminCircleDetailHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	circle, err := model.GetCircleDetail(a.DB, vars["circle_name"])
	if err != nil {
		log.Printf("getCircleDetail err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	res, err := json.Marshal(circle)
	if err != nil {
		log.Printf("Marshal %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(res)

}

/*----post,update,delete => tag,circle,event*/

//json受け取り
func (a *Admin) PostAdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("post admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	defer r.Body.Close()
	var circle model.Circle
	err = json.Unmarshal(b, &circle)
	if err != nil {
		log.Printf("post admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.InsertCircle(a.DB, &circle)
	if err != nil {
		log.Printf("post admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) UpdateAdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	defer r.Body.Close()
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("update circle_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot uptada circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("update admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot update circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	var circle model.Circle
	err = json.Unmarshal(b, &circle)
	if err != nil {
		log.Printf("post admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.UpdateCircle(a.DB, circle_id, &circle)
	if err != nil {
		log.Printf("post admin circleDeteil err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) DeleteAdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	defer r.Body.Close()
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("delete circle_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	err = model.DeleteCircle(a.DB, circle_id)
	if err != nil {
		log.Printf("delete circle  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete circl"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "delete circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return

}

func (a *Admin) PostAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("post admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("post admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	defer r.Body.Close()
	var events []model.Event
	err = json.Unmarshal(b, &events)
	if err != nil {
		log.Printf("post admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.InsertEvents(a.DB, circle_id, &events)
	if err != nil {
		log.Printf("post admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) UpdateAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	defer r.Body.Close()
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("circle_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found circle_id"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	event_id, err := strconv.Atoi(vars["event_id"])
	if err != nil {
		log.Printf("event_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found event_id"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("event_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot update event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	var event model.Event
	err = json.Unmarshal(b, &event)
	if err != nil {
		log.Printf("update admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	err = model.UpdateCircleEvent(a.DB, circle_id, event_id, &event)
	if err != nil {
		log.Printf("update admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot update event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "update event"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return

}

func (a *Admin) DeleteAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	defer r.Body.Close()
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("circle_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found circle_id"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	event_id, err := strconv.Atoi(vars["event_id"])
	if err != nil {
		log.Printf("event_id  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found event_id"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	err = model.DeleteCircleEvent(a.DB, circle_id, event_id)
	if err != nil {
		log.Printf("delete admin event err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete event"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusAccepted)
	status := StatusCode{Code: http.StatusAccepted, Message: "delete event"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) PostAdminCircleTagHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle_id, _ := strconv.Atoi(vars["circle_id"])
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("post admin event tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist event tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	defer r.Body.Close()
	var tags []model.Tag
	err = json.Unmarshal(b, &tags)
	if err != nil {
		log.Printf("post admin event tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.InsertCircleTags(a.DB, circle_id, &tags)
	if err != nil {
		log.Printf("post admin event tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}
func (a *Admin) DeleteAdminCircleTagHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle_id, _ := strconv.Atoi(vars["circle_id"])
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("delete circle tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete circle tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	defer r.Body.Close()
	var tags []model.Tag
	err = json.Unmarshal(b, &tags)
	if err != nil {
		log.Printf("delete circle tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.DeleteCircleTags(a.DB, circle_id, &tags)
	if err != nil {
		log.Printf("update circle tag  err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot update tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) PostAdminTagHandler(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("post tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	defer r.Body.Close()
	var tags []model.Tag
	err = json.Unmarshal(b, &tags)
	if err != nil {
		log.Printf("post admin tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}

	err = model.InsertTags(a.DB, &tags)
	if err != nil {
		log.Printf("post admin event tag err %v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist tag"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
	res, _ := json.Marshal(status)
	w.Write(res)
	return
}

func (a *Admin) UploadCirclePicture(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle_id, err := strconv.Atoi(vars["circle_id"])
	img, err := imageupload.Process(r, "image")
	if err != nil {
		log.Printf("upload circle picture:%v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not file"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	thumb, err := imageupload.ThumbnailPNG(img, 300, 300)
	if err != nil {
		log.Printf("upload :%v\n", err)
		return
	}

	image := "img/circles/" + strconv.FormatUint(uint64(circle_id), 10) + ".png"
	err = model.UploadCirclePicture(a.DB, circle_id, image)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot upload"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	thumb.Save("public/" + image)
	w = SetHeader(w, http.StatusCreated)
	status := StatusCode{Code: http.StatusCreated, Message: "upload image"}
	res, _ := json.Marshal(status)
	w.Write(res)
}

func (a *Admin) UploadEventPicture(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle_id, err := strconv.Atoi(vars["circle_id"])
	if err != nil {
		log.Printf("upload event picture:%v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "circle id is bad"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	event_id, err := strconv.Atoi(vars["event_id"])
	if err != nil {
		log.Printf("upload event picture:%v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "event_id is bad"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	img, err := imageupload.Process(r, "image")
	if err != nil {
		log.Printf("upload event picture:%v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not file"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	thumb, err := imageupload.ThumbnailPNG(img, 300, 300)
	if err != nil {
		log.Printf("upload :%v\n", err)
		return
	}

	image := "img/events/" + strconv.FormatUint(uint64(event_id), 10) + "_" + strconv.FormatUint(uint64(event_id), 10) + ".png"
	err = model.UploadEventPicture(a.DB, circle_id, event_id, image)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot upload"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	thumb.Save("public/" + image)
	w = SetHeader(w, http.StatusCreated)
	status := StatusCode{Code: http.StatusCreated, Message: "upload image"}
	res, _ := json.Marshal(status)
	w.Write(res)
}
