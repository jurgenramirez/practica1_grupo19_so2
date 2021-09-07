package main

import (
	"fmt"
	"log"
	"sopes1-proyecto1/src"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
)

func main() {
	app := fiber.New()
	app.Use(compress.New())
	app.Use(func(c *fiber.Ctx) error {
		privateCached := "must-revalidate, private, no-cache"
		c.Set("cache-control", privateCached)
		return c.Next()
	})

	app.Static("/", src.GetEnv("PUBLIC_DIR", "../web/build"))

	// GET /
	app.Get("/ram", src.GetRAM)
	app.Get("/cpu", src.GetCPU)

	app.Static("*", src.GetEnv("PUBLIC_DIR", "../web/build")+"/index.html")

	p := ":" + src.GetEnv("GO_PORT", "4000")
	fmt.Println(p)

	log.Fatal(app.Listen(":" + src.GetEnv("PORT", "3000")))

}
