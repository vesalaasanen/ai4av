---
spec_id: admin/datapath-vsn400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Datapath VSN400 Control Spec"
manufacturer: Datapath
model_family: VSN400
aliases: []
compatible_with:
  manufacturers:
    - Datapath
  models:
    - VSN400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - datapathdocuments.co.uk
  - elecdan-solutions.com
  - egeratedocuments.com
  - all-guidesbox.com
source_urls:
  - https://www.datapathdocuments.co.uk/wp-content/uploads/WC10_UG_EN.pdf
  - https://datapathdocuments.co.uk/wp-content/uploads/VSN400_User_Guide_EN.pdf
  - https://www.elecdan-solutions.com/wp-content/uploads/2024/07/VSN400_User_Guide_EN.pdf
  - "https://www.egeratedocuments.com/markalar/datapath/User%20Guide/VSN400-User-Guide.pdf"
  - https://all-guidesbox.com/model/datapath/vsn400-series.html
retrieved_at: 2026-07-25T01:32:28.629Z
last_checked_at: 2026-08-05T08:15:53.500Z
generated_at: 2026-08-05T08:15:53.500Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the WallControl 10 control documentation; it does not enumerate the VSN400 hardware I/O inventory, serial/RS-232 chassis control, or firmware-specific behaviour. RS-232 on the VSN400 chassis itself is not documented here."
  - "full exit-code table only obtainable via -exitcodes query on a live device"
  - "exact field schemas of the list outputs (-layouts, -inputs,"
  - "integer ranges for brightness/contrast/hue/saturation/equalisation"
  - "source documents no unsolicited push/notification model. All"
  - "source documents no named multi-step macro sequences. Layout"
  - "source contains no safety warnings, interlock procedures, or"
  - "VSN400 hardware specifications (I/O count, capture channels, voltages) not present in this control-surface document."
  - "full list of supported provider types per VSN400 configuration not enumerable from this doc."
  - "Web API (REST) endpoint inventory beyond the Swagger reference URL is not transcribed in this source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:15:53.500Z
  matched_actions: 130
  action_count: 130
  confidence: medium
  summary: "All 130 spec actions map to switches documented verbatim in the source; transport values (port 23, base_url 19821) are supported; coverage is 1:1. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Datapath VSN400 Control Spec

## Summary
The Datapath VSN400 is a video wall controller controlled via the WallControl 10 software platform. External control is exposed through a command-line interface (`wcmd.exe`) reachable over Telnet (TCP), a Web API (HTTP/Swagger), and local command-line invocation. This spec enumerates the documented WallControl 10 command-line switches that drive window, layout, wall, source, OSD, banner, border, frame, streaming and display-power operations on a VSN400 wall.

<!-- UNRESOLVED: source is the WallControl 10 control documentation; it does not enumerate the VSN400 hardware I/O inventory, serial/RS-232 chassis control, or firmware-specific behaviour. RS-232 on the VSN400 chassis itself is not documented here. -->

## Transport
```yaml
protocols:
  - tcp       # Telnet CLI on port 23 (default), wcmd.exe issued remotely
  - http      # Web API / Swagger on port 19821
addressing:
  # Telnet default port stated verbatim in source
  port: 23
  # Web API access point stated verbatim in source
  base_url: "http://<wallserver>:19821"
auth:
  # Source documents optional username/password (URM). When the caller is a
  # Windows user authorised in URM, no credentials are needed. Remote/other
  # users must supply -username/-password.
  type: basic  # documented but optional; conditional on URM authorisation
```

Additional documented network endpoints (context, not the primary control channel):
- TCP 8081 — default Wall Port (configurable)
- TCP 8099 — legacy CLI port (from v1.9 equals Wall Port)
- TCP 10500 — Quant Collaboration Port (configurable)
- TCP 19820 — Internal Database port
- TCP 5900 — Datapath Agent port (configurable)
- TCP+UDP 8584 — Vision Streaming (configurable)
- UDP 3702 — Discovery Port

## Traits
```yaml
traits:
  - powerable   # inferred: -setpowerstate / -getpowerstate documented
  - routable    # inferred: input provider selection + window layout/routing
  - queryable   # inferred: many query switches (-layouts, -inputs, -getpowerstate, -wallstate...)
  - levelable   # inferred: brightness/contrast/hue/saturation/powerlevel
```

## Actions
```yaml
# All switches below are documented as distinct rows in the WallControl 10
# command-line reference. Commands are issued via wcmd.exe (local) or Telnet.
# Many switches are modifiers used "in conjunction with" a primary command;
# they are listed separately because the source documents them as distinct
# rows, but their command field shows the verbatim usage template.

# --- Information Commands ---
- id: help
  label: Display Command-Line Help
  kind: query
  command: "wcmd.exe -help"
  params: []

- id: help_for_command
  label: Help For Specific Command
  kind: query
  command: "wcmd.exe -help={-command}"
  params:
    - name: command
      type: string
      description: Switch to get specific help for

- id: exitcodes
  label: Display Exit Codes
  kind: query
  command: "wcmd.exe -exitcodes"
  params: []

- id: layouts_list
  label: List Layouts
  kind: query
  command: "wcmd.exe -layouts"
  params: []

- id: providers_list
  label: List Providers
  kind: query
  command: "wcmd.exe -providers"
  params: []

- id: openwindows_list
  label: List Open Windows
  kind: query
  command: "wcmd.exe -openwindows"
  params: []

- id: inputs_list
  label: List Inputs
  kind: query
  command: "wcmd.exe -inputs"
  params: []

# --- Inputs / Sources ---
- id: provider_target
  label: Target Provider Type
  kind: action
  command: "wcmd.exe -provider={Capture|Video|Word|Application|Quant|Image|IPDecode|Web|Pdf|Remote}"
  params:
    - name: provider
      type: string
      description: Provider type to target

- id: input_target
  label: Target Input By Name
  kind: action
  command: "wcmd.exe -provider={provider} -input={name}"
  params:
    - name: name
      type: string
      description: Input name or identity (number for Capture, friendly name for IP)

- id: addinput
  label: Add New Source
  kind: action
  command: "wcmd.exe -provider={provider} -addinput={url} -alias={name}"
  params:
    - name: url
      type: string
      description: Source URL or stream address (must be unique)
    - name: name
      type: string
      description: Friendly alias name

- id: alias
  label: Set Source Alias
  kind: action
  command: "wcmd.exe -alias={name}"
  params:
    - name: name
      type: string
      description: Friendly name allocated to a source

- id: readonly
  label: Set Source Alias Editability
  kind: action
  command: "wcmd.exe -readonly={true|false}"
  params:
    - name: value
      type: boolean
      description: true = uneditable, false = editable

- id: shared
  label: Set Source Store Scope
  kind: action
  command: "wcmd.exe -shared={true|false}"
  params:
    - name: value
      type: boolean
      description: true = Global Media Store, false = Local Wall Content Store

- id: streamusername
  label: Set Stream Source Username
  kind: action
  command: "wcmd.exe -streamusername={username} -streampassword={password}"
  params:
    - name: username
      type: string
      description: Username for stream source (must pair with password)

- id: streampassword
  label: Set Stream Source Password
  kind: action
  command: "wcmd.exe -streampassword={password}"
  params:
    - name: password
      type: string
      description: Password for stream source (must pair with username)

- id: deleteinput
  label: Delete Source
  kind: action
  command: "wcmd.exe -provider={provider} -deleteinput={name|identity}"
  params:
    - name: name
      type: string
      description: Input URL/name/identity to delete (local sources only)

- id: createcrop
  label: Create Permanent Source Crop
  kind: action
  command: "wcmd.exe -machine={server}:{port} -provider={Capture|IpDecode} -input={input} -alias={name} -createcrop={top},{left},{width},{height} -sourcesize={sourceWidth},{sourceHeight}"
  params:
    - name: top
      type: integer
    - name: left
      type: integer
    - name: width
      type: integer
    - name: height
      type: integer
    - name: sourceWidth
      type: integer
    - name: sourceHeight
      type: integer

- id: sourcesize
  label: Specify Source Size For Crop
  kind: action
  command: "wcmd.exe -sourcesize={sourceWidth},{sourceHeight}"
  params:
    - name: sourceWidth
      type: integer
    - name: sourceHeight
      type: integer

- id: tags
  label: Add Tags To Source
  kind: action
  command: "wcmd.exe -provider={provider} -addinput={url} -alias={name} -tags={tag1},{tag2},{tag3}"
  params:
    - name: tags
      type: string
      description: Comma-separated tag list

- id: location
  label: Add Location Tag To Source
  kind: action
  command: "wcmd.exe -provider={provider} -addinput={url} -alias={name} -location={location}"
  params:
    - name: location
      type: string

# --- Layouts ---
- id: layout_open
  label: Open Layout
  kind: action
  command: "wcmd.exe -layout={layout file}"
  params:
    - name: layout
      type: string
      description: Layout file name (quote if contains spaces)

- id: layout_schedule
  label: Schedule Layout Task
  kind: action
  command: "wcmd.exe -layout={name} -schedule={datetime}"
  params:
    - name: name
      type: string
    - name: datetime
      type: string
      description: "Format DD/MM/YYYY HH:mm:ss (Windows culture dependent)"

- id: layout_save
  label: Save Current Wall As Layout
  kind: action
  command: "wcmd.exe -savelayout={name}"
  params:
    - name: name
      type: string

- id: layout_delete
  label: Delete Layout
  kind: action
  command: "wcmd.exe -deletelayout={name}"
  params:
    - name: name
      type: string

# --- Walls / Display Power ---
- id: getpowerstate
  label: Get Display Power State
  kind: query
  command: "wcmd.exe -getpowerstate"
  params: []

- id: setpowerstate
  label: Set Display Power State
  kind: action
  command: "wcmd.exe -machine={server}:{port} -setpowerstate={on|off}"
  params:
    - name: state
      type: string
      description: "on | off"

- id: getpowerlevel
  label: Get Display Power Level
  kind: query
  command: "wcmd.exe -machine={server}:{port} -getpowerlevel"
  params: []

- id: setpowerlevel
  label: Set Display Power Level
  kind: action
  command: "wcmd.exe -setpowerlevel={Eco|EcoAdvanced|Bright|Normal}"
  params:
    - name: level
      type: string
      description: "Eco | EcoAdvanced | Bright | Normal"

- id: wallstate_all
  label: Get All Wall States
  kind: query
  command: "wcmd.exe -wallstate"
  params: []

- id: wallstate_one
  label: Get Specific Wall State
  kind: query
  command: "wcmd.exe -wallstate={wall name}"
  params:
    - name: wall
      type: string

- id: startwalls_autostart
  label: Start All AutoStart Walls
  kind: action
  command: "wcmd.exe -startwalls"
  params: []

- id: startwalls_all
  label: Start All Walls Regardless Of AutoStart
  kind: action
  command: "wcmd.exe -startwalls=all"
  params: []

- id: startwall
  label: Start Specific Wall
  kind: action
  command: "wcmd.exe -startwall={wall name}"
  params:
    - name: wall
      type: string

- id: stopwalls
  label: Stop All Walls
  kind: action
  command: "wcmd.exe -stopwalls"
  params: []

- id: stopwall
  label: Stop Specific Wall
  kind: action
  command: "wcmd.exe -stopwall={wall name}"
  params:
    - name: wall
      type: string

- id: setdefaultlayout
  label: Set Default Layout For Wall
  kind: action
  command: "wcmd.exe -wall={wall} -setdefaultlayout={layout}"
  params:
    - name: wall
      type: string
      description: Defaults to Blueprint wall if omitted
    - name: layout
      type: string

# --- Windows ---
- id: window_open
  label: Open Window
  kind: action
  command: "wcmd.exe -provider={provider} -id={window number} -input={name|identity} -window={left},{top},{width},{height}"
  params:
    - name: id
      type: integer
      description: Window number
    - name: left
      type: integer
    - name: top
      type: integer
    - name: width
      type: integer
    - name: height
      type: integer

- id: window_move_resize
  label: Move/Resize Open Window
  kind: action
  command: "wcmd.exe -id={window number} -window={left},{top},{width},{height}"
  params:
    - name: id
      type: integer
    - name: left
      type: integer
    - name: top
      type: integer
    - name: width
      type: integer
    - name: height
      type: integer

- id: closewindows_all
  label: Close All Open Windows
  kind: action
  command: "wcmd.exe -closewindows"
  params: []

- id: closewindow
  label: Close Specific Window
  kind: action
  command: "wcmd.exe -id={window number} -closewindow"
  params:
    - name: id
      type: integer

- id: windowstyle
  label: Set Window Style
  kind: action
  command: "wcmd.exe -id={window number} -windowstyle={BorderAndTitlebar|NoBorderAndTitlebar}"
  params:
    - name: id
      type: integer
    - name: style
      type: string

- id: sendto
  label: Send Window Front/Back
  kind: action
  command: "wcmd.exe -id={window number} -sendto={front|back}"
  params:
    - name: id
      type: integer
    - name: z
      type: string
      description: "front | back"

- id: aspectratio
  label: Set Window Aspect Ratio
  kind: action
  command: "wcmd.exe -id={window number} -aspectratio={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: audio
  label: Set Window Audio
  kind: action
  command: "wcmd.exe -id={window number} -audio={on|true|off|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: string

- id: pixelformat
  label: Set Vision Window Pixel Format
  kind: action
  command: "wcmd.exe -id={window number} -pixelformat={Auto|RGB565|RGB888|YUY2}"
  params:
    - name: id
      type: integer
    - name: format
      type: string

- id: rotate
  label: Rotate Capture Window
  kind: action
  command: "wcmd.exe -id={window number} -rotate={0|90|180|270}"
  params:
    - name: id
      type: integer
    - name: degrees
      type: integer

- id: hscroll
  label: Set Window Horizontal Scroll
  kind: action
  command: "wcmd.exe -id={window number} -hscroll={pixels}"
  params:
    - name: id
      type: integer
    - name: pixels
      type: integer

- id: vscroll
  label: Set Window Vertical Scroll
  kind: action
  command: "wcmd.exe -id={window number} -vscroll={pixels}"
  params:
    - name: id
      type: integer
    - name: pixels
      type: integer

- id: refresh
  label: Set Web Window Refresh Interval
  kind: action
  command: "wcmd.exe -id={window number} -refresh={seconds}"
  params:
    - name: id
      type: integer
    - name: seconds
      type: integer

- id: zoom
  label: Set Window Zoom Percentage
  kind: action
  command: "wcmd.exe -id={window number} -zoom={percentage}"
  params:
    - name: id
      type: integer
    - name: percentage
      type: integer
      description: "Min 25, Max 500"

# --- On Screen Display (OSD) ---
- id: osdfonts
  label: List Supported OSD Fonts
  kind: query
  command: "wcmd.exe -osdfonts"
  params: []

- id: osdvariables
  label: List OSD Variable Placeholders
  kind: query
  command: "wcmd.exe -osdvariables"
  params: []

- id: osdtext
  label: Set OSD Text Content
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text}"
  params:
    - name: id
      type: integer
    - name: text
      type: string

- id: osdtextwrapping
  label: Set OSD Text Wrapping
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdtextwrapping={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: osdtextbold
  label: Set OSD Text Bold
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdtextbold={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: osdtextitalic
  label: Set OSD Text Italic
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdtextitalic={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: osdtextunderlined
  label: Set OSD Text Underlined
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdtextunderlined={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: osdfontcolour
  label: Set OSD Font Colour
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdfontcolour={red},{green},{blue}"
  params:
    - name: id
      type: integer
    - name: red
      type: integer
      description: 0-255
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255

- id: osdfontsize
  label: Set OSD Font Size
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdfontsize={size}"
  params:
    - name: id
      type: integer
    - name: size
      type: integer
      description: 1-1000

- id: osdfont
  label: Set OSD Font
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdfont={font name}"
  params:
    - name: id
      type: integer
    - name: font
      type: string

- id: osdbtransparent
  label: Set OSD Background Transparent
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdbtransparent={true|false}"
  params:
    - name: id
      type: integer
    - name: value
      type: boolean

- id: osdbcolour
  label: Set OSD Background Colour
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdbcolour={alpha},{red},{green},{blue}"
  params:
    - name: id
      type: integer
    - name: alpha
      type: integer
      description: 0-255
    - name: red
      type: integer
      description: 0-255
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255

- id: osdscaled
  label: Set OSD Scaling Mode
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdscaled={fixed|scaled}"
  params:
    - name: id
      type: integer
    - name: mode
      type: string

- id: osdhalignment
  label: Set OSD Horizontal Alignment
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdhalignment={left|center|right}"
  params:
    - name: id
      type: integer
    - name: align
      type: string

- id: osdvalignment
  label: Set OSD Vertical Alignment
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdvalignment={top|center|bottom}"
  params:
    - name: id
      type: integer
    - name: align
      type: string

- id: osdmargins
  label: Set OSD Margins
  kind: action
  command: "wcmd.exe -id={window id} -osdtext={text} -osdmargins={left},{top},{right},{bottom}"
  params:
    - name: id
      type: integer
    - name: left
      type: integer
    - name: top
      type: integer
    - name: right
      type: integer
    - name: bottom
      type: integer

- id: removeosd
  label: Remove OSD From Window
  kind: action
  command: "wcmd.exe -id={window id} -removeosd"
  params:
    - name: id
      type: integer

# --- Coloured Borders ---
- id: removeborder
  label: Remove Coloured Border
  kind: action
  command: "wcmd.exe -id={window id} -removeborder"
  params:
    - name: id
      type: integer

- id: borderstatus
  label: Get Coloured Border Status
  kind: query
  command: "wcmd.exe -id={window id} -borderstatus"
  params:
    - name: id
      type: integer

- id: border_apply
  label: Apply Coloured Border (Defaults)
  kind: action
  command: "wcmd.exe -id={window id} -border"
  params:
    - name: id
      type: integer

- id: bordercolour
  label: Set Border Primary Colour
  kind: action
  command: "wcmd.exe -id={window id} -border -bordercolour={alpha},{red},{green},{blue}"
  params:
    - name: id
      type: integer
    - name: alpha
      type: integer
      description: 0-255
    - name: red
      type: integer
      description: 0-255
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255

- id: bordercolouralt
  label: Set Border Alternative Colour
  kind: action
  command: "wcmd.exe -id={window id} -border -bordercolouralt={alpha},{red},{green},{blue}"
  params:
    - name: id
      type: integer
    - name: alpha
      type: integer
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: borderthickness
  label: Set Border Thickness
  kind: action
  command: "wcmd.exe -id={window id} -border -borderthickness={left},{top},{right},{bottom}"
  params:
    - name: id
      type: integer
    - name: left
      type: integer
    - name: top
      type: integer
    - name: right
      type: integer
    - name: bottom
      type: integer

- id: borderflash
  label: Set Border Flash Speed
  kind: action
  command: "wcmd.exe -id={window id} -border -borderflash={off|slow|medium|fast}"
  params:
    - name: id
      type: integer
    - name: speed
      type: string

- id: bordereasing
  label: Set Border Easing
  kind: action
  command: "wcmd.exe -id={window id} -border -bordereasing={off|on}"
  params:
    - name: id
      type: integer
    - name: value
      type: string

- id: borderscaling
  label: Set Border Scaling Mode
  kind: action
  command: "wcmd.exe -id={window id} -border -borderscaling={fixed|scaled}"
  params:
    - name: id
      type: integer
    - name: mode
      type: string

# --- Coloured Frames ---
- id: framestatus
  label: Get Wall Frame Options
  kind: query
  command: "wcmd.exe -framestatus"
  params: []

- id: frames_enable
  label: Enable Wall Frames
  kind: action
  command: "wcmd.exe -frames={true} -framesthickness={thickness} -framescolour={red},{green},{blue}"
  params:
    - name: thickness
      type: integer
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: frames_disable
  label: Disable Wall Frames
  kind: action
  command: "wcmd.exe -frames={false}"
  params: []

- id: framesthickness
  label: Set Frame Thickness
  kind: action
  command: "wcmd.exe -frames={true} -framesthickness={thickness} -framescolour={red},{green},{blue}"
  params:
    - name: thickness
      type: integer

- id: framescolour
  label: Set Frame Default Colour
  kind: action
  command: "wcmd.exe -frames={true} -framesthickness={thickness} -framescolour={red},{green},{blue}"
  params:
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: windowframestatus
  label: Get Window Frame Options
  kind: query
  command: "wcmd.exe -id={window id} -windowframestatus"
  params:
    - name: id
      type: integer

- id: windowframemode
  label: Set Window Frame Colour Mode
  kind: action
  command: "wcmd.exe -id={window id} -windowframemode={default|source|window}"
  params:
    - name: id
      type: integer
    - name: mode
      type: string

- id: windowframecolour
  label: Set Window Frame Specific Colour
  kind: action
  command: "wcmd.exe -id={window id} -windowframecolour={red},{green},{blue} -windowframemode={window}"
  params:
    - name: id
      type: integer
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

# --- Banners ---
- id: bannerdelete
  label: Delete Banner Definition
  kind: action
  command: "wcmd.exe -bannerdelete={Name of Banner}"
  params:
    - name: name
      type: string

- id: banneradd
  label: Add Banner Definition
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text}"
  params:
    - name: name
      type: string
    - name: text
      type: string

- id: bannertext
  label: Set Banner Text Or RSS URL
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text}"
  params:
    - name: name
      type: string
    - name: text
      type: string

- id: bannerfontcolour
  label: Set Banner Font Colour
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannerfontcolour={alpha},{red},{green},{blue}"
  params:
    - name: name
      type: string
    - name: alpha
      type: integer
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: bannerbackcolour
  label: Set Banner Background Colour
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannerbackcolour={alpha},{red},{green},{blue}"
  params:
    - name: name
      type: string
    - name: alpha
      type: integer
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: font
  label: Set Banner Font
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -font={font name}"
  params:
    - name: name
      type: string
    - name: font
      type: string

- id: fontsize
  label: Set Banner Font Size
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -fontsize={font size}"
  params:
    - name: name
      type: string
    - name: size
      type: integer
      description: 6-450

- id: bannermargin
  label: Set Banner Vertical Margin
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannermargin={margin}"
  params:
    - name: name
      type: string
    - name: margin
      type: integer

- id: bannerspeed
  label: Set Banner Scroll Speed
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannerspeed={off|slow|medium|fast}"
  params:
    - name: name
      type: string
    - name: speed
      type: string

- id: bannerdirection
  label: Set Banner Scroll Direction
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannerdirection={left|right}"
  params:
    - name: name
      type: string
    - name: direction
      type: string

- id: bannerblink
  label: Set Banner Blink Speed
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -bannerblink={off|slow|medium|fast}"
  params:
    - name: name
      type: string
    - name: speed
      type: string

- id: alignment
  label: Set Banner Text Alignment
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={text} -alignment={left|centre|right}"
  params:
    - name: name
      type: string
    - name: align
      type: string

- id: bannerisrss
  label: Set Banner RSS Mode
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={rss URL} -bannerisrss={false|true}"
  params:
    - name: name
      type: string
    - name: value
      type: boolean

- id: bannerrsstime
  label: Set Banner RSS Refresh Time
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={rss URL} -bannerisrss={true} -bannerrsstime={HH:MM}"
  params:
    - name: name
      type: string
    - name: time
      type: string
      description: "HH:MM, HH 0-23, MM 0-59"

- id: bannerrssfeedtype
  label: Set Banner RSS Feed Type
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={rss URL} -bannerisrss={true} -bannerrssfeedtype={brief|full}"
  params:
    - name: name
      type: string
    - name: type
      type: string

- id: bannerrssdelimiter
  label: Set Banner RSS Delimiter
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={rss URL} -bannerisrss={true} -bannerrssdelimiter={string}"
  params:
    - name: name
      type: string
    - name: delimiter
      type: string
      description: 0-10 characters

- id: bannerrssseparator
  label: Set Banner RSS Separator
  kind: action
  command: "wcmd.exe -banneradd={banner name} -bannertext={rss URL} -bannerisrss={true} -bannerrssseparator={string}"
  params:
    - name: name
      type: string
    - name: separator
      type: string
      description: 0-10 characters

- id: bannername
  label: Select Banner Definition By Name
  kind: action
  command: "wcmd.exe -bannername={banner name} -bannerid={id}"
  params:
    - name: name
      type: string
    - name: id
      type: integer

- id: bannerid
  label: Target Open Banner Region By Id
  kind: action
  command: "wcmd.exe -bannername={banner name} -bannerid={id} -area={X},{Y},{Width},{Height}"
  params:
    - name: name
      type: string
    - name: id
      type: integer

- id: area
  label: Define Banner Area Rectangle
  kind: action
  command: "wcmd.exe -bannername={banner name} -bannerid={id} -area={X},{Y},{Width},{Height}"
  params:
    - name: X
      type: integer
    - name: Y
      type: integer
    - name: Width
      type: integer
    - name: Height
      type: integer

- id: bannerclose
  label: Close Open Banner Region
  kind: action
  command: "wcmd.exe -bannerid={id} -bannerclose"
  params:
    - name: id
      type: integer

- id: openbanners
  label: List Open Banner Regions
  kind: query
  command: "wcmd.exe -openbanners"
  params: []

# --- Vision Streaming ---
- id: streamstatus_all
  label: Get Vision Streaming Status (All)
  kind: query
  command: "wcmd.exe -streamstatus"
  params: []

- id: streamstatus_one
  label: Get Vision Streaming Status (Specific Input)
  kind: query
  command: "wcmd.exe -input={input id} -streamstatus"
  params:
    - name: input
      type: integer

- id: streaming
  label: Start/Stop Vision Source Streaming
  kind: action
  command: "wcmd.exe -input={input id} -streaming={true|false}"
  params:
    - name: input
      type: integer
    - name: value
      type: boolean

# --- Favourite Definitions ---
- id: favouritedelete
  label: Delete Favourite Definition
  kind: action
  command: "wcmd.exe -favouritedelete={Name of Favourite}"
  params:
    - name: name
      type: string

- id: favourites_list
  label: List Favourite Definitions
  kind: query
  command: "wcmd.exe -favourites"
  params: []

- id: favouritesave
  label: Save Window As Favourite
  kind: action
  command: "wcmd.exe -favouritesave={Name of Favourite} -id={id}"
  params:
    - name: name
      type: string
    - name: id
      type: integer

- id: favouriteopen
  label: Open Favourite Definition
  kind: action
  command: "wcmd.exe -favouriteopen={Name of Favourite} -id={id}"
  params:
    - name: name
      type: string
    - name: id
      type: integer

# --- PDF Provider ---
- id: toolbar
  label: Set PDF Toolbar Visibility
  kind: action
  command: "wcmd.exe -id={id} -toolbar={true|false|on|off}"
  params:
    - name: id
      type: integer
    - name: value
      type: string

- id: pagenumber
  label: Set PDF Page Number
  kind: action
  command: "wcmd.exe -id={id} -pagenumber={number}"
  params:
    - name: id
      type: integer
    - name: number
      type: integer

- id: viewmode
  label: Set PDF View Mode
  kind: action
  command: "wcmd.exe -id={id} -viewmode={fit|fitV|fitH|zoom}"
  params:
    - name: id
      type: integer
    - name: mode
      type: string

# --- Vision Source Properties ---
- id: interlacing
  label: Set Vision Source Interlacing Mode
  kind: action
  command: "wcmd.exe -id={id} -interlacing={bob|weave}"
  params:
    - name: id
      type: integer
    - name: mode
      type: string

- id: colourdomain
  label: Set Vision Source Colour Domain
  kind: action
  command: "wcmd.exe -id={id} -colourdomain={colour domain}"
  params:
    - name: id
      type: integer
    - name: domain
      type: string
      description: "rgb709full|yuv709full|yuv601full|yuv709studio|yuv601studio|rgb709studio|yuv2020full|yuv2020studio|rgb601full|rgb601studio|rgb2020full|rgb2020studio|auto"

- id: linkrate
  label: Set Vision Source Link Rate
  kind: action
  command: "wcmd.exe -id={id} -linkrate={rgbLinkrateRbr|rgbLinkrateHbr|rgbLinkrateHbr2}"
  params:
    - name: id
      type: integer
    - name: rate
      type: string

- id: equalisation
  label: Set Vision Source Equalisation
  kind: action
  command: "wcmd.exe -id={id} -equalisation={integer}"
  params:
    - name: id
      type: integer
    - name: value
      type: integer

- id: brightness
  label: Set Vision Source Brightness
  kind: action
  command: "wcmd.exe -id={id} -brightness={integer}"
  params:
    - name: id
      type: integer
    - name: value
      type: integer

- id: contrast
  label: Set Vision Source Contrast
  kind: action
  command: "wcmd.exe -id={id} -contrast={integer}"
  params:
    - name: id
      type: integer
    - name: value
      type: integer

- id: hue
  label: Set Vision Source Hue
  kind: action
  command: "wcmd.exe -id={id} -hue={integer}"
  params:
    - name: id
      type: integer
    - name: value
      type: integer

- id: saturation
  label: Set Vision Source Saturation
  kind: action
  command: "wcmd.exe -id={id} -saturation={integer}"
  params:
    - name: id
      type: integer
    - name: value
      type: integer

# --- System / Targeting ---
- id: machine
  label: Specify Target Server And Port
  kind: action
  command: "wcmd.exe -machine={server}:{port} {command}"
  params:
    - name: server
      type: string
    - name: port
      type: integer

- id: wall
  label: Specify Target Wall By Name
  kind: action
  command: "wcmd.exe -machine={server} -wall={wall name} {command}"
  params:
    - name: wall
      type: string

- id: serverport
  label: Override Default Server Port
  kind: action
  command: "wcmd.exe -serverport={port number} {command}"
  params:
    - name: port
      type: integer
      description: Overrides default 19821

- id: echo
  label: Return Exit Code To Command Line
  kind: action
  command: "wcmd.exe {command} -echo"
  params: []

# --- Authentication ---
- id: username
  label: Provide Username For Remote Connection
  kind: action
  command: "wcmd.exe -username={username} -password={password} {command}"
  params:
    - name: username
      type: string

- id: password
  label: Provide Password For Remote Connection
  kind: action
  command: "wcmd.exe -username={username} -password={password} {command}"
  params:
    - name: password
      type: string
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off]
    source: "-getpowerstate result"

  - id: power_level
    type: enum
    values: [Normal, Eco, EcoAdvanced, Bright]
    source: "-getpowerlevel result"

  - id: exit_code
    type: enum
    values: ["0 (success)", ">0 (error)"]
    source: "-echo output, e.g. ExitCode: 0"
    # UNRESOLVED: full exit-code table only obtainable via -exitcodes query on a live device

  - id: border_settings
    type: object
    source: "-borderstatus result"

  - id: window_frame_settings
    type: object
    source: "-windowframestatus result"

  - id: wall_frame_settings
    type: object
    source: "-framestatus result"

  - id: stream_status
    type: object
    source: "-streamstatus result"

  # UNRESOLVED: exact field schemas of the list outputs (-layouts, -inputs,
  # -openwindows, -providers, -osdvariables, -wallstate) are not enumerated in
  # the source beyond example formatting for -inputs
  # (Alias="friendly name", Provider="web", Input="http://xxxxxxxx").
```

## Variables
```yaml
variables:
  - id: power_level
    type: enum
    values: [Eco, EcoAdvanced, Bright, Normal]
    set_via: setpowerlevel
    get_via: getpowerlevel

  - id: window_position_size
    type: composite
    fields: [left, top, width, height]
    set_via: window_open / window_move_resize

  - id: web_refresh_interval
    type: integer
    unit: seconds
    set_via: refresh

  - id: zoom_percentage
    type: integer
    range: [25, 500]
    set_via: zoom

  - id: pdf_page
    type: integer
    set_via: pagenumber

  - id: brightness
    type: integer
    set_via: brightness

  - id: contrast
    type: integer
    set_via: contrast

  - id: hue
    type: integer
    set_via: hue

  - id: saturation
    type: integer
    set_via: saturation

  - id: equalisation
    type: integer
    set_via: equalisation
  # UNRESOLVED: integer ranges for brightness/contrast/hue/saturation/equalisation
  # not stated in source
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited push/notification model. All
# state is obtained via explicit query switches.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences. Layout
# open/save is the closest analogue but is a single-switch operation.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Display power on/off (-setpowerstate) notes
# a hardware delay but no safety interlock.
```

## Notes
- Control surface is the WallControl 10 platform; commands are issued through `wcmd.exe`, either locally at a command prompt or remotely over Telnet. A separate Web API is discoverable via Swagger at `http://<wallserver>:19821/swagger` (must be enabled in Developer Settings).
- `-echo` exists specifically to return exit codes for AMX/Crestron integration; without it the exit code is not printed to the command-line output.
- From WallControl 10 v1.9 the CLI port equals the Wall Port (8081 default); pre-1.9 the legacy CLI port was 8099. The port is honoured when upgrading from 1.8 onwards.
- Child/multi-walls use a randomly generated port in the 30000-40000 range, manually reconfigurable.
- Datapath Agent supports extra "cropped" Remote Connection sources, each on a unique port (recommended range 5901-49151) with a geometry spec, addressable as `host:port`.
- `-id` is the window identifier; only one window may hold a given ID at a time. Many window commands require `-id` to target the correct window.

<!-- UNRESOLVED: VSN400 hardware specifications (I/O count, capture channels, voltages) not present in this control-surface document. -->
<!-- UNRESOLVED: full list of supported provider types per VSN400 configuration not enumerable from this doc. -->
<!-- UNRESOLVED: Web API (REST) endpoint inventory beyond the Swagger reference URL is not transcribed in this source. -->

## Provenance

```yaml
source_domains:
  - datapathdocuments.co.uk
  - elecdan-solutions.com
  - egeratedocuments.com
  - all-guidesbox.com
source_urls:
  - https://www.datapathdocuments.co.uk/wp-content/uploads/WC10_UG_EN.pdf
  - https://datapathdocuments.co.uk/wp-content/uploads/VSN400_User_Guide_EN.pdf
  - https://www.elecdan-solutions.com/wp-content/uploads/2024/07/VSN400_User_Guide_EN.pdf
  - "https://www.egeratedocuments.com/markalar/datapath/User%20Guide/VSN400-User-Guide.pdf"
  - https://all-guidesbox.com/model/datapath/vsn400-series.html
retrieved_at: 2026-07-25T01:32:28.629Z
last_checked_at: 2026-08-05T08:15:53.500Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:15:53.500Z
matched_actions: 130
action_count: 130
confidence: medium
summary: "All 130 spec actions map to switches documented verbatim in the source; transport values (port 23, base_url 19821) are supported; coverage is 1:1. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the WallControl 10 control documentation; it does not enumerate the VSN400 hardware I/O inventory, serial/RS-232 chassis control, or firmware-specific behaviour. RS-232 on the VSN400 chassis itself is not documented here."
- "full exit-code table only obtainable via -exitcodes query on a live device"
- "exact field schemas of the list outputs (-layouts, -inputs,"
- "integer ranges for brightness/contrast/hue/saturation/equalisation"
- "source documents no unsolicited push/notification model. All"
- "source documents no named multi-step macro sequences. Layout"
- "source contains no safety warnings, interlock procedures, or"
- "VSN400 hardware specifications (I/O count, capture channels, voltages) not present in this control-surface document."
- "full list of supported provider types per VSN400 configuration not enumerable from this doc."
- "Web API (REST) endpoint inventory beyond the Swagger reference URL is not transcribed in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
