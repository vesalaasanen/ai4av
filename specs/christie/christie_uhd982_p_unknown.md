---
spec_id: admin/christie-uhd982-p
schema_version: ai4av-public-spec-v1
revision: 2
title: "Christie UHD982 P Control Spec"
manufacturer: Christie
model_family: "UHD982 P"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "UHD982 P"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
  - manua.ls
  - all-guidesbox.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001765-01-christie-lit-man-ref-api-uhd982-p.pdf
  - https://www.manualslib.com/manual/1719910/Christie-Access-Series.html
  - https://www.manua.ls/christie/access-uhd982-p/manual
  - https://all-guidesbox.com/model/christie/uhd982-p.html
retrieved_at: 2026-05-14T14:00:17.996Z
last_checked_at: 2026-09-26T22:15:39.757Z
generated_at: 2026-09-26T22:15:39.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Wake on LAN procedure described but not a command; WOL software required. UNRESOLVED: LED status values beyond on/off not enumerated."
  - "GET* commands that return non-discrete values (e.g. GETTVLIFETIME)"
  - "no unsolicited event notifications described in source."
  - "no explicit multi-step macro sequences described in source."
  - "no safety warnings or interlock procedures beyond Wake on LAN note."
  - "KEY command values (menu, vol+, play, etc.) not fully enumerated — source references KEY+ and KEY? as discovery commands but does not list all values. UNRESOLVED: SETPOWERONDELAY parameter name inconsistency in example (SETPOWERDELAY shown but SETPOWERONDELAY documented). UNRESOLVED: GETDNS1 and GETDNS2 return DNS server addresses but which DNS server (1 or 2) not clear from response format. UNRESOLVED: SETSOURCE source values (SCART1, FAV, SVHS, etc.) not confirmed compatible with UHD982 P hardware. UNRESOLVED: SCHEDULEOP source values (DP, OPS, DVI, HDMI, YPBPR) partially overlap with but differ from SELECTSOURCE/SETSOURCE values."
verification:
  verdict: verified
  checked_at: 2026-09-26T22:15:39.757Z
  matched_actions: 107
  action_count: 107
  confidence: medium
  summary: "All 107 spec actions map 1:1 to source TOC mnemonics; transport parameters (port 1986, baud 115200, 8N1) verbatim from source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie UHD982 P Control Spec

## Summary
Christie 98" Access Series LCD panel. Supports RS232 and TCP/IP (Telnet) control. Commands cover picture, audio, network, source selection, power, and display settings. No authentication required.

<!-- UNRESOLVED: Wake on LAN procedure described but not a command; WOL software required. UNRESOLVED: LED status values beyond on/off not enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # default; returns to 38400 in OFF state when set to 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 1986  # TCP/Telnet port stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # STANDBY, WAKEUP present
- routable       # SELECTSOURCE, SETSOURCE present
- queryable      # GET* commands returning values present
- levelable      # SETBRIGHTNESS, SETCONTRAST, SETCOLOUR, SETSHARPNESS, STV, HEADPHONEVOLUME present
```

## Actions
```yaml
# --- Existing action commands (payloads added verbatim from source) ---

- id: autopos
  label: Auto Position
  kind: action
  command: "AUTOPOS"
  params: []

- id: changelng
  label: Change Language
  kind: action
  command: "CHANGELNG {area} {language}"
  params:
    - name: area
      type: integer
      description: "0=System, 1=Event, 2=Primary Audio, 3=Secondary Audio, 4=Primary Subtitle, 5=Secondary Subtitle, 6=Primary Teletext, 7=Secondary Teletext"
    - name: language
      type: integer
      description: "0=Danish..36=Kazakh, 37=Thai"

- id: colourtemp
  label: Set Color Temperature
  kind: action
  command: "COLOURTEMP {value}"
  params:
    - name: value
      type: enum
      values: [normal, warm, cool]

- id: contrastdown
  label: Decrease Contrast
  kind: action
  command: "CONTRASTDOWN"
  params: []

- id: contrastup
  label: Increase Contrast
  kind: action
  command: "CONTRASTUP"
  params: []

- id: dotclock
  label: Set Dot Clock
  kind: action
  command: "DOTCLOCK {value}"
  params:
    - name: value
      type: integer
      description: Range -50 to 50

- id: headphonelvolume
  label: Set Headphone Volume
  kind: action
  command: "HEADPHONEVOLUME {level}"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: hpos
  label: Set Horizontal Position
  kind: action
  command: "HPOS {value}"
  params:
    - name: value
      type: integer
      description: "-25 to 25 (percentage of image)"

- id: key
  label: Send Key Command
  kind: action
  command: "KEY {value}"
  params:
    - name: value
      type: string
      description: "Number, direction, or menu item. Use KEY+ or KEY? to list."

- id: menumtimeout
  label: Set Menu Timeout
  kind: action
  command: "MENUTIMEOUT {time}"
  params:
    - name: time
      type: enum
      values: [0, 15, 30, 60]
      description: "0=Off, 15=15s, 30=30s, 60=60s"

- id: picturemode
  label: Set Picture Mode
  kind: action
  command: "PICTUREMODE {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Dynamic, 2=Natural, 3=Cinema, 4=Game, 5=Sport"

- id: picturezoom
  label: Set Zoom Mode
  kind: action
  command: "PICTUREZOOM {mode}"
  params:
    - name: mode
      type: enum
      values: [auto, "16:9", subtitle, "14:9", "14:9zoom", "4:3", full, cinema]

- id: reset
  label: Reset Display
  kind: action
  command: "RESET"
  params: []

- id: rst
  label: Restart Display
  kind: action
  command: "RST"
  params: []

- id: savemodelinfo
  label: Save Model Info to USB
  kind: action
  command: "SAVEMODELINFO"
  params: []

- id: selectsource
  label: Select Video Source
  kind: action
  command: "SELECTSOURCE {source}"
  params:
    - name: source
      type: integer
      description: "5=BACK AV, 7=HDMI1, 8=HDMI2, 11=YPbPr, 12=VGA, 18=DVI, 19=DP, 20=OPS"

- id: set_ip_address
  label: Set Static IP Address
  kind: action
  command: "set_IP_address {ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address for eth0

- id: setavl
  label: Set AVL
  kind: action
  command: "SETAVL {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: setbalance
  label: Set Audio Balance
  kind: action
  command: "SETBALANCE {value}"
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: setbrightness
  label: Set Brightness
  kind: action
  command: "SETBRIGHTNESS {value}"
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: setcolour
  label: Set Color
  kind: action
  command: "SETCOLOUR {value}"
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: setcontrast
  label: Set Contrast
  kind: action
  command: "SETCONTRAST {value}"
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: setcountry
  label: Set Country
  kind: action
  command: "SETCOUNTRY {country}"
  params:
    - name: country
      type: string

- id: setdefaultgateway
  label: Set Default Gateway
  kind: action
  command: "SETDEFAULTGATEWAY {gateway}"
  params:
    - name: gateway
      type: string
      description: IPv4 address

- id: setdigitalout
  label: Set Digital Out
  kind: action
  command: "SETDIGITALOUT {mode}"
  params:
    - name: mode
      type: enum
      values: [compressed, pcm]

- id: setdynamicbass
  label: Set Dynamic Bass
  kind: action
  command: "SETDYNAMICBASS {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: setequserfreq
  label: Set Equalizer User Frequency
  kind: action
  command: "SETEQUSERFREQ {band} {setting}"
  params:
    - name: band
      type: string
      description: "120Hz, 500Hz, 1.5KHz, 5KHz, 10KHz"
    - name: setting
      type: integer
      description: -12 to 12

- id: seteqmode
  label: Set Equalizer Mode
  kind: action
  command: "SETEQMODE {mode}"
  params:
    - name: mode
      type: enum
      values: [Music, Movie, Speech, Flat, Classic, User]

- id: setheadphoneoutput
  label: Set Headphone Output
  kind: action
  command: "SETHEADPHONEOUTPUT {output}"
  params:
    - name: output
      type: enum
      values: [headphone, lineout]

- id: setmute
  label: Toggle Mute
  kind: action
  command: "SETMUTE"
  params: []

- id: setnetworktype
  label: Set Network Type
  kind: action
  command: "SETNETWORKTYPE {type}"
  params:
    - name: type
      type: enum
      values: [wired, wireless, disabled]

- id: setopspower
  label: Set OPS Power
  kind: action
  command: "SETOPSPOWER {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: setpowerondelay
  label: Set Power On Delay
  kind: action
  command: "SETPOWERONDELAY {delay}"  # source example uses SETPOWERDELAY; documented name is SETPOWERONDELAY
  params:
    - name: delay
      type: integer
      description: "0 to 20 (delay = 100ms * delay)"

- id: setquickstandby
  label: Set Quick Standby
  kind: action
  command: "SETQUICKSTANDBY {value}"
  params:
    - name: value
      type: enum
      values: [on, off]

- id: setrc
  label: Set Remote Control State
  kind: action
  command: "SETRC {value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: setscheduleop
  label: Set Schedule Parameters
  kind: action
  command: "SETSCHEDULEOP {preset}_{on_enabled}_{on_time}_{off_enabled}_{off_time}_{days}_{source}"
  params:
    - name: preset
      type: integer
      description: "1 to 4"
    - name: on_enabled
      type: integer
      description: "0=Disabled, 1=Enabled"
    - name: on_time
      type: string
      description: "hh:mm format"
    - name: off_enabled
      type: integer
      description: "0=Disabled, 1=Enabled"
    - name: off_time
      type: string
      description: "hh:mm format"
    - name: days
      type: string
      description: "7 digits starting Sunday (0=off, 1=on)"
    - name: source
      type: enum
      values: [LastSource, USB, DP, OPS, DVI, HDMI, YPBPR, "VGA/PC"]

- id: setscheduler
  label: Set Scheduler State
  kind: action
  command: "SETSCHEDULER {preset} {state}"
  params:
    - name: preset
      type: integer
      description: "1 to 4"
    - name: state
      type: enum
      values: [ON, OFF]

- id: setsharpness
  label: Set Sharpness
  kind: action
  command: "SETSHARPNESS {value}"
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: setslideshowinterval
  label: Set Slideshow Interval
  kind: action
  command: "SETSLIDESHOWINTERVAL {seconds}"
  params:
    - name: seconds
      type: enum
      values: [5, 10, 15, 20, 25, 30]

- id: setsoundmode
  label: Set Sound Mode
  kind: action
  command: "SETSOUNDMODE {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Mono, 1=Stereo, 2=Dual I, 3=Dual II, 4=Mono left, 5=Mono right"

- id: setsource
  label: Enable/Disable Source
  kind: action
  command: "SETSOURCE {source} {state}"
  params:
    - name: source
      type: enum
      values: [SCART1, SCART2, FAV, SVHS, HDMI1, HDMI2, HDMI3, HDMI4, YPBPR, VGA, SCART1S, SCART2S]
    - name: state
      type: integer
      description: "0=Disable, 1=Enable"

- id: setsubnetmask
  label: Set Subnet Mask
  kind: action
  command: "SETSUBNETMASK {mask}"
  params:
    - name: mask
      type: string
      description: IPv4 subnet mask

- id: setusbautoplay
  label: Set USB Autoplay
  kind: action
  command: "SETUSBAUTOPLAY {value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: setviewstyle
  label: Set Media Browser View Style
  kind: action
  command: "SETVIEWSTYLE {view}"
  params:
    - name: view
      type: enum
      values: [Flat, Folder]

- id: signagereset
  label: Reset Signage Settings
  kind: action
  command: "SIGNAGERESET"
  params: []

- id: soundreset
  label: Reset Sound Settings
  kind: action
  command: "SOUNDRESET"
  params: []

- id: standby
  label: Enter Standby
  kind: action
  command: "STANDBY"
  params: []

- id: startfti
  label: Start First Time Installation
  kind: action
  command: "STARTFTI"
  params: []

- id: stea
  label: Stop Emergency Alarm
  kind: action
  command: "STEA"
  params: []

- id: stv
  label: Set Volume
  kind: action
  command: "STV {value}"
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: stwa
  label: Stop Wake Alarm
  kind: action
  command: "STWA"
  params: []

- id: swol
  label: Set Wake on LAN
  kind: action
  command: "SWOL {value}"
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"

- id: unp
  label: Send Message
  kind: action
  command: "UNP {message}"
  params:
    - name: message
      type: string
      description: Formatted as "word1+word2+word3..."

- id: volumedown
  label: Volume Down
  kind: action
  command: "VOLUMEDOWN"
  params: []

- id: volumeup
  label: Volume Up
  kind: action
  command: "VOLUMEUP"
  params: []

- id: vpos
  label: Set Vertical Position
  kind: action
  command: "VPOS {value}"
  params:
    - name: value
      type: integer
      description: -25 to 25

- id: wakeup
  label: Wake from Standby
  kind: action
  command: "WAKEUP"
  params: []

# --- Query commands (added in upgrade pass; verbatim GET* opcodes from source) ---

- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "get_IP_address"
  params: []

- id: getavl
  label: Get AVL State
  kind: query
  command: "GETAVL"
  params: []

- id: getbalance
  label: Get Balance
  kind: query
  command: "GETBALANCE"
  params: []

- id: getbrightness
  label: Get Brightness
  kind: query
  command: "GETBRIGHTNESS"
  params: []

- id: getcolour
  label: Get Color
  kind: query
  command: "GETCOLOUR"
  params: []

- id: getcolourtemp
  label: Get Color Temperature
  kind: query
  command: "GETCOLOURTEMP"
  params: []

- id: getcontrast
  label: Get Contrast
  kind: query
  command: "GETCONTRAST"
  params: []

- id: getcountry
  label: Get Country
  kind: query
  command: "GETCOUNTRY"
  params: []

- id: getdefaultgateway
  label: Get Default Gateway
  kind: query
  command: "GETDEFAULTGATEWAY"
  params: []

- id: getdigitalout
  label: Get Digital Out
  kind: query
  command: "GETDIGITALOUT"
  params: []

- id: getdns1
  label: Get DNS Server 1
  kind: query
  command: "GETDNS1"
  params: []

- id: getdns2
  label: Get DNS Server 2
  kind: query
  command: "GETDNS2"
  params: []

- id: getdotclock
  label: Get Dot Clock
  kind: query
  command: "GETDOTCLOCK"
  params: []

- id: getdynamicbass
  label: Get Dynamic Bass
  kind: query
  command: "GETDYNAMICBASS"
  params: []

- id: getenergysaving
  label: Get Energy Saving Mode
  kind: query
  command: "GETENERGYSAVING"
  params: []

- id: getequserfreq
  label: Get Equalizer User Frequency
  kind: query
  command: "GETEQUSERFREQ {band}"
  params:
    - name: band
      type: string
      description: "120Hz, 500Hz, 1.5KHz, 5KHz, 10KHz"

- id: geteqmode
  label: Get Equalizer Mode
  kind: query
  command: "GETEQMODE"
  params: []

- id: getfreespace
  label: Get USB Free Space
  kind: query
  command: "GETFREESPACE"
  params: []

- id: getheadphoneoutput
  label: Get Headphone Output
  kind: query
  command: "GETHEADPHONEOUTPUT"
  params: []

- id: getheadphonevolume
  label: Get Headphone Volume
  kind: query
  command: "GETHEADPHONEVOLUME"
  params: []

- id: gethpos
  label: Get Horizontal Position
  kind: query
  command: "GETHPOS"
  params: []

- id: getled
  label: Get LED State
  kind: query
  command: "GETLED"
  params: []

- id: getmenutimeout
  label: Get Menu Timeout
  kind: query
  command: "GETMENUTIMEOUT"
  params: []

- id: getmodelno
  label: Get Model Number
  kind: query
  command: "GETMODELNO"
  params: []

- id: getmute
  label: Get Mute State
  kind: query
  command: "GETMUTE"
  params: []

- id: getnetworktype
  label: Get Network Type
  kind: query
  command: "GETNETWORKTYPE"
  params: []

- id: getopspower
  label: Get OPS Power State
  kind: query
  command: "GETOPSPOWER"
  params: []

- id: getosdorientation
  label: Get OSD Orientation
  kind: query
  command: "GETOSDORIENTATION"
  params: []

- id: getpicturemode
  label: Get Picture Mode
  kind: query
  command: "GETPICTUREMODE"
  params: []

- id: getpowerondelay
  label: Get Power On Delay
  kind: query
  command: "GETPOWERONDELAY"
  params: []

- id: getpowersave
  label: Get Power Save Mode
  kind: query
  command: "GETPOWERSAVE"
  params: []

- id: getquickstandby
  label: Get Quick Standby
  kind: query
  command: "GETQUICKSTANDBY"
  params: []

- id: getrc
  label: Get Remote Control State
  kind: query
  command: "GETRC"
  params: []

- id: getscheduleop
  label: Get Schedule Parameters
  kind: query
  command: "GETSCHEDULEOP {preset}"
  params:
    - name: preset
      type: integer
      description: "1 to 4"

- id: getscheduler
  label: Get Scheduler State
  kind: query
  command: "GETSCHEDULER {preset}"
  params:
    - name: preset
      type: integer
      description: "1 to 4"

- id: getserialno
  label: Get Serial Number
  kind: query
  command: "GETSERIALNO"
  params: []

- id: getsharpness
  label: Get Sharpness
  kind: query
  command: "GETSHARPNESS"
  params: []

- id: getslideshowinterval
  label: Get Slideshow Interval
  kind: query
  command: "GETSLIDESHOWINTERVAL"
  params: []

- id: getsource
  label: Get Current Source
  kind: query
  command: "GETSOURCE"
  params: []

- id: getstandby
  label: Get Standby Status
  kind: query
  command: "GETSTANDBY"
  params: []

- id: getswversion
  label: Get Software Version
  kind: query
  command: "GETSWVERSION"
  params: []

- id: getsubnetmask
  label: Get Subnet Mask
  kind: query
  command: "GETSUBNETMASK"
  params: []

- id: gettotalspace
  label: Get USB Total Space
  kind: query
  command: "GETTOTALSPACE"
  params: []

- id: getusbautoplay
  label: Get USB Autoplay
  kind: query
  command: "GETUSBAUTOPLAY"
  params: []

- id: getviewstyle
  label: Get Media Browser View Style
  kind: query
  command: "GETVIEWSTYLE"
  params: []

- id: gettvlifetime
  label: Get TV Lifetime
  kind: query
  command: "GETTVLIFETIME"
  params: []

- id: getvolume
  label: Get Volume Level
  kind: query
  command: "GETVOLUME"
  params: []

- id: getvpos
  label: Get Vertical Position
  kind: query
  command: "GETVPOS"
  params: []

- id: gwol
  label: Get Wake on LAN Status
  kind: query
  command: "GWOL"
  params: []

- id: time
  label: Get Date and Time
  kind: query
  command: "TIME"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  # inferred from STANDBY/WAKEUP, GETSTANDBY responses

- id: standby_response
  label: Standby Response
  type: enum
  values: ["standby on", "standby off"]

- id: source_state
  label: Current Source
  type: string
  # response format: #*source is VGA

- id: volume_level
  label: Volume Level
  type: integer
  # response format: #*volume level is 7

- id: mute_state
  label: Mute State
  type: enum
  values: ["MUTE ON", "MUTE OFF"]

- id: brightness_value
  label: Brightness
  type: integer
  # response format: #*Picture brightness value is set to 25

- id: contrast_value
  label: Contrast
  type: integer
  # response format: #*THE CONTRAST VALUE : 25

- id: colour_value
  label: Color
  type: integer
  # response format: #*The colour value : 43

- id: sharpness_value
  label: Sharpness
  type: integer
  # response format: #*THE SHARPNESS VALUE : 30

- id: colour_temp
  label: Color Temperature
  type: enum
  values: [normal, warm, cool]

- id: picture_mode
  label: Picture Mode
  type: integer
  # response format: #*Picture Mode is 3

- id: ip_address
  label: IP Address
  type: string
  # response format: #*IP address is xxx.xxx.xxx.xxx

- id: subnet_mask
  label: Subnet Mask
  type: string
  # response format: #*the subnet mask is 255.255.255.0

- id: default_gateway
  label: Default Gateway
  type: string
  # response format: #*the default gateway is 10.1.1.3

- id: dns_server
  label: DNS Server
  type: string
  # response format: #*DNS server 1 is 10.10.10.10

- id: network_type
  label: Network Type
  type: enum
  values: [wired, wireless, disabled]
  # response format: #*the network type is wired

- id: model_number
  label: Model Number
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: sw_version
  label: Software Version
  type: string
  # response format: #*V <version number>

- id: free_space
  label: USB Free Space
  type: integer
  description: megabytes
  # response format: #*The total space is 480 MB

- id: total_space
  label: USB Total Space
  type: integer
  description: megabytes
  # response format: #*The total space is 4096 MB

- id: energy_saving
  label: Energy Saving Mode
  type: enum
  values: [on, off]
  # response format: #*The energy saving mode is on

- id: power_save
  label: Power Save Mode
  type: enum
  values: [on, off]
  # response format: #*Powersavemode is ON

- id: quick_standby
  label: Quick Standby
  type: enum
  values: [on, off]
  # response format: #*Quick Standby is off

- id: scheduler_state
  label: Scheduler State
  type: enum
  values: [ON, OFF]
  # response format: #*The scheduler is ON

- id: scheduler_params
  label: Scheduler Parameters
  type: string
  # response format: #*Scheduler: 1 - Active: 1 - Source: 12 - OFF Enabled: 1 ON: 31/07/2017 10:30:00 - OFF: 01/08/2017 03:30:00 DAYS: MON TUE WED THU FRI SAT SUN

- id: balance_value
  label: Balance
  type: integer
  # response format: #*balance level is -20

- id: headphone_output
  label: Headphone Output
  type: enum
  values: [LINEOUT, HEADPHONE]

- id: headphone_volume
  label: Headphone Volume
  type: integer
  # response format: #*headphone volume level is 7

- id: avl_state
  label: AVL State
  type: enum
  values: [0, 1]
  # response format: #*avl state is 0

- id: dynamic_bass
  label: Dynamic Bass
  type: enum
  values: [0, 1]
  # response format: #*The dynamic bass state is 0

- id: digital_out
  label: Digital Out
  type: enum
  values: [pcm, compressed]

- id: equalizer_mode
  label: Equalizer Mode
  type: enum
  values: [Music, Movie, Speech, Flat, Classic, User]
  # response format: #*the equalizer mode is Movie

- id: equalizer_freq
  label: Equalizer Frequency Value
  type: integer
  # response format: #*the equalizer value for the band is 10

- id: sound_mode
  label: Sound Mode
  type: integer
  # response format: #*setSoundMode() set to 1

- id: usb_autoplay
  label: USB Autoplay
  type: enum
  values: [ON, OFF]
  # response format: #*The USB autoplay is ON

- id: view_style
  label: Media Browser View Style
  type: string
  # response format: #*The view style is flat

- id: slideshow_interval
  label: Slideshow Interval
  type: integer
  description: seconds
  # response format: #*The slideshow interval is 30 seconds

- id: menu_timeout
  label: Menu Timeout
  type: enum
  values: [0, 15, 30, 60, OFF]
  # response format: #*menu timeout mode is 15

- id: led_state
  label: LED State
  type: enum
  values: [on, off]

- id: remote_control_state
  label: Remote Control State
  type: enum
  values: [on, off]
  # response format: #*remote control commands are on

- id: country
  label: Country
  type: string
  # response format: #*COUNTRY IS : Canada

- id: dot_clock
  label: Dot Clock
  type: integer
  # response format: #*The dot clock is 12

- id: hpos
  label: Horizontal Position
  type: integer
  # response format: #*The horizontal position is -10

- id: vpos
  label: Vertical Position
  type: integer
  # response format: #*The vertical position is -10

- id: osd_orientation
  label: OSD Orientation
  type: string
  # response format: #*The OSD orientation landscape

- id: ops_power
  label: OPS Power State
  type: string
  # response format: #*The OPS is not plugged in / #*The OPS is on / #*The OPS is off

- id: wol_state
  label: Wake on LAN State
  type: enum
  values: [0, 1]
  # response format: GWOL returns current WOL enable/disable state

- id: power_on_delay
  label: Power On Delay
  type: integer
  description: milliseconds
  # response format: #*The power on delay is 1200 ms

- id: tv_lifetime
  label: TV Lifetime
  type: integer
  description: minutes
  # response format: #*Monitor Life Time: n

- id: time
  label: Date Time
  type: string

- id: message_result
  label: Message Send Result
  type: string
  # response format: #*Message Sent in SUCCESS !!!
```

## Variables
```yaml
# No distinct Variables section - all settable parameters exposed as Actions.
# UNRESOLVED: GET* commands that return non-discrete values (e.g. GETTVLIFETIME)
# are captured in Feedbacks above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Device appears to be poll-only (commands trigger responses, no autonomous push).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "WAKEUP command requires baud rate 38400. When baud is 115200, panel returns to 38400 when in OFF state - set to 38400 before issuing WAKEUP."
  # Wake on LAN requires LAN Standby enabled and display in Standby mode.
```
<!-- UNRESOLVED: no safety warnings or interlock procedures beyond Wake on LAN note. -->

## Notes
Serial and TCP share the same command set. TCP uses Telnet on port 1986; terminal programs must send CR+LF after commands. Serial default is 115200 baud but returns to 38400 in OFF state when set to 115200 — use 38400 for Wake on LAN compatibility. No authentication on any control interface.

Upgrade pass: added verbatim `command:` payloads to all existing actions, and added the full set of query commands (GET*, GWOL, TIME) that the source documents as distinct command rows but the prior spec omitted from Actions.
<!-- UNRESOLVED: KEY command values (menu, vol+, play, etc.) not fully enumerated — source references KEY+ and KEY? as discovery commands but does not list all values. UNRESOLVED: SETPOWERONDELAY parameter name inconsistency in example (SETPOWERDELAY shown but SETPOWERONDELAY documented). UNRESOLVED: GETDNS1 and GETDNS2 return DNS server addresses but which DNS server (1 or 2) not clear from response format. UNRESOLVED: SETSOURCE source values (SCART1, FAV, SVHS, etc.) not confirmed compatible with UHD982 P hardware. UNRESOLVED: SCHEDULEOP source values (DP, OPS, DVI, HDMI, YPBPR) partially overlap with but differ from SELECTSOURCE/SETSOURCE values. -->
````

Done. Changes: added `command:` field (verbatim source payloads) to all 57 existing actions; appended 50 missing query actions (`GET*`, `GWOL`, `TIME`) as `kind: query`. Existing IDs/shapes, Transport, Feedbacks, Safety all preserved. Revision bumped 1→2.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
  - manua.ls
  - all-guidesbox.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001765-01-christie-lit-man-ref-api-uhd982-p.pdf
  - https://www.manualslib.com/manual/1719910/Christie-Access-Series.html
  - https://www.manua.ls/christie/access-uhd982-p/manual
  - https://all-guidesbox.com/model/christie/uhd982-p.html
retrieved_at: 2026-05-14T14:00:17.996Z
last_checked_at: 2026-09-26T22:15:39.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T22:15:39.757Z
matched_actions: 107
action_count: 107
confidence: medium
summary: "All 107 spec actions map 1:1 to source TOC mnemonics; transport parameters (port 1986, baud 115200, 8N1) verbatim from source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Wake on LAN procedure described but not a command; WOL software required. UNRESOLVED: LED status values beyond on/off not enumerated."
- "GET* commands that return non-discrete values (e.g. GETTVLIFETIME)"
- "no unsolicited event notifications described in source."
- "no explicit multi-step macro sequences described in source."
- "no safety warnings or interlock procedures beyond Wake on LAN note."
- "KEY command values (menu, vol+, play, etc.) not fully enumerated — source references KEY+ and KEY? as discovery commands but does not list all values. UNRESOLVED: SETPOWERONDELAY parameter name inconsistency in example (SETPOWERDELAY shown but SETPOWERONDELAY documented). UNRESOLVED: GETDNS1 and GETDNS2 return DNS server addresses but which DNS server (1 or 2) not clear from response format. UNRESOLVED: SETSOURCE source values (SCART1, FAV, SVHS, etc.) not confirmed compatible with UHD982 P hardware. UNRESOLVED: SCHEDULEOP source values (DP, OPS, DVI, HDMI, YPBPR) partially overlap with but differ from SELECTSOURCE/SETSOURCE values."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
