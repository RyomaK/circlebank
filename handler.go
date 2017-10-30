package circlebank

//Authをハンドラーにかけて、ログイン判定できたらいいな

/*
func Auth(h handler) handler {
	return func(w http.ResponseWriter, r *http.Request) error {
		if !controller.IsLogin(r) {
			a, err := json.Marshal("{login:}")
			if err != nil {
				fmt.Errorf("err %v", err)
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(a)
		}
		h.ServeHTTP(w, r)
		return nil
	}
}
*/
