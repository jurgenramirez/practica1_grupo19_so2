package src

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type RAM struct {
	RAMTotal        int `json:"ram_total"`
	RAMUsage        int `json:"ram_usage"`
	RAMFree         int `json:"ram_free"`
	RAMUsagePercent int `json:"ram_usage_percent"`
}
type Process struct {
	PID     int            `json:"pid"`
	Name    string         `json:"nombre"`
	State   int            `json:"estado"`
	Ram     int            `json:"ram"`
	Usuario int            `json:"usuario"`
	Hijos   []ProcessChild `json:"hijos"`
}
type ProcessChild struct {
	PID     int    `json:"pid"`
	Name    string `json:"nombre"`
	State   int    `json:"estado"`
	Ram     int    `json:"ram"`
	Usuario int    `json:"usuario"`
}

func GetRAM(c *fiber.Ctx) error {
	path := "/proc/mem_grupo19"

	str, err := RunCMD("cat", path)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Ha fallado la ejecución de la terminal",
		})
	}
	ram := new(RAM)
	// To-Do Parse
	//fmt.Println(str)
	err = json.Unmarshal([]byte(str), &ram)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "no se ha podido parsear el String a JSON",
		})
	}

	return c.JSON(fiber.Map{
		"ram":         ram.RAMTotal,
		"ram_usage":   ram.RAMUsage,
		"ram_free":    ram.RAMFree,
		"ram_percent": ram.RAMUsagePercent,
	})
}

func GetCPU(c *fiber.Ctx) error {
	path := "/proc/cpu_grupo19"

	str, err := RunCMD("cat", path)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Ha fallado la ejecución de la terminal",
		})
	}

	// To-Do Parse
	//fmt.Println(str)
	process := new([]Process)

	err = json.Unmarshal([]byte(str), &process)
	if err != nil {
		println(str)
		return c.Status(500).JSON(fiber.Map{
			"error": "no se ha podido parsear el String a JSON",
		})
	}

	return c.JSON(fiber.Map{
		"process_total": len(*process),
		"process":       process,
	})
}

func RunCMD(name string, args ...string) (string, error) {
	cmd := exec.Command(name, args...)
	stdout, err := cmd.Output()
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	cadena := strings.ReplaceAll(string(stdout), ",]", "]")
	cadena = strings.ReplaceAll(cadena, ",}", "}")
	stdout = []byte(cadena)
	return string(stdout), nil
}