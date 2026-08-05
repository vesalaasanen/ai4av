---
spec_id: admin/tandberg-mxp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tandberg MXP Series Control Spec"
manufacturer: Tandberg
model_family: "MXP Series"
aliases: []
compatible_with:
  manufacturers:
    - Tandberg
  models:
    - "MXP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - manualsdir.com
  - manualmachine.com
  - stone-oakvalley-studios.com
source_urls:
  - https://usermanual.wiki/Document/tandbergmxpreferenceuserguideforsystemintegratorsf8.1653454696.pdf
  - https://usermanual.wiki/TANDBERG/MXP.3726017066.pdf
  - https://www.manualsdir.com/manuals/213271/tandberg-mxp.html
  - https://manualmachine.com/tandberg/mxp/464245-user-manual/
  - https://www.stone-oakvalley-studios.com/uploads/000926092022233802/mxp_reference_user_guide_for_system_integrators.pdf
retrieved_at: 2026-05-18T17:04:01.469Z
last_checked_at: 2026-07-22T01:31:30.368Z
generated_at: 2026-07-22T01:31:30.368Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "xpreferences xpathwrite"
  - "xpreferences detaillevel"
  - "xpreferences xmlcommandresult"
  - "xpreferences xmlconfigfeedback"
  - "xpreferences xmlstatusfeedback"
  - "xpreferences itemnumber"
  - "xpreferences completepath"
  - "device model variant (3000 vs 6000) not specified in source, some config options differ"
  - "full xStatus tree (BRI/PRI/ICE/Ethernet/IP sub-blocks) not reproduced verbatim"
  - "full xConfiguration tree (ISDN/PRI/SIP/H323/QoS/OSD/Preset/Video/etc.)"
  - "no explicit macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version not stated in source; some config options vary by MXP model variant (3000 vs 6000); HTTP/HTTPS authentication mechanism not specified; FIPSMode impact on auth flow not detailed"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:31:30.368Z
  matched_actions: 93
  action_count: 93
  confidence: medium
  summary: "All 93 spec actions match source verbatim with correct params; only the xpreferences family remains unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Tandberg MXP Series Control Spec

## Summary
Tandberg MXP Series video conferencing endpoints (3000 MXP / 6000 MXP variants). Controlled via XACLI (RS-232 or Telnet) and TXAS (TANDBERG XML API Service over HTTP/HTTPS). RS-232 default 9600/8/N/1 on 9-pin D-sub (DCE). Telnet on port 23 (or 57 with MD5 challenge). HTTP TXAS on port 80. Commands use `xcommand`, `xconfiguration`, `xstatus`, `xhistory`, `xevent` prefixes.

<!-- UNRESOLVED: device model variant (3000 vs 6000) not specified in source, some config options differ -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # DTR/RTS ignored; DSR/CD/CTS always asserted; RI unused
addressing:
  port: 23  # Telnet default; TelnetChallenge Port can be 23 or 57
  base_url: http://<host>/  # TXAS HTTP on port 80; HTTPS also supported (port not stated)
auth:
  type: none  # inferred: serial requires no auth; TelnetChallenge MD5 is optional (Mode On/Off); HTTP TXAS auth unspecified in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: Boot command present
  - queryable    # inferred: xStatus, xConfiguration, xHistory return state
  - routable     # inferred: Video Inputs/Outputs, Switch Source, DuoVideo, VirtualMonitor routing
  - levelable    # inferred: Audio Volume, Camera Brightness, Input/Output Levels
```

## Actions
```yaml
# xCommand reference - full enumeration from source.
# Command payload format: `xcommand <name> <param>:<value> ...`
# (r) = required parameter.

- id: alerttonetest
  label: Alert Tone Test
  kind: action
  command: "xcommand alerttonetest tone:{tone}"
  params:
    - name: tone
      type: integer
      description: Tone 1-10 (required)

- id: audiotestsignal
  label: Audio Test Signal
  kind: action
  command: "xcommand audiotestsignal type:{type} level:{level} output:{output} frq:{frq}"
  params:
    - name: type
      type: enum
      values: [None, Sine, White, Pink]
      description: Required
    - name: level
      type: integer
      description: Level -60 to 0
    - name: output
      type: enum
      values: [FarEnd, Speaker, AuX, VCR]
    - name: frq
      type: integer
      description: Frequency 100-20000 Hz

- id: boot
  label: Boot
  kind: action
  command: "xcommand boot parameterrestore:{parameterrestore}"
  params:
    - name: parameterrestore
      type: enum
      values: [On, Off]

- id: callaccept
  label: Accept Call
  kind: action
  command: "xcommand callaccept"
  params: []

- id: callmute
  label: Call Mute
  kind: action
  command: "xcommand callmute call:{call} mode:{mode}"
  params:
    - name: call
      type: integer
      description: Call number 1-11 (required)
    - name: mode
      type: enum
      values: [On, Off]
      description: Required

- id: callmuteoutgoing
  label: Call Mute Outgoing
  kind: action
  command: "xcommand callmuteoutgoing call:{call} mode:{mode}"
  params:
    - name: call
      type: integer
      description: Call number 1-11 (required)
    - name: mode
      type: enum
      values: [On, Off]
      description: Required

- id: callsetaudiotp
  label: Call Set Audio TP
  kind: action
  command: "xcommand callsetaudiotp call:{call} mode:{mode}"
  params:
    - name: call
      type: integer
      description: Call number 1-11 (required)
    - name: mode
      type: enum
      values: [On, Off]
      description: Required

- id: cameratype
  label: Camera Move
  kind: action
  command: "xcommand cameramove camera:{camera} direction:{direction}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)
    - name: direction
      type: enum
      values: [Up, Down, Right, Left, In, Out, FocusIn, FocusOut]
      description: Required
  notes: "legacy id `cameratype`; source opcode is CameraMove"

- id: camerafocus
  label: Camera Focus
  kind: action
  command: "xcommand camerafocus camera:{camera} value:{value}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)
    - name: value
      type: enum
      values: [Auto, Manual, "+", "-"]
      description: Required

- id: cameraforceupgrade
  label: Camera Force Upgrade
  kind: action
  command: "xcommand cameraforceupgrade camera:{camera}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)

- id: camerahalt
  label: Camera Halt
  kind: action
  command: "xcommand camerahalt"
  params: []

- id: cameraposition
  label: Camera Position
  kind: action
  command: "xcommand cameraposition camera:{camera} pan:{pan} tilt:{tilt} zoom:{zoom} focus:{focus}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)
    - name: pan
      type: integer
      description: -32768 to 32767
    - name: tilt
      type: integer
      description: -32768 to 32767
    - name: zoom
      type: integer
      description: 0 to 65534
    - name: focus
      type: integer
      description: 0 to 65534

- id: camerareconfigure
  label: Camera Reconfigure
  kind: action
  command: "xcommand camerareconfigure"
  params: []

- id: cameratrackingstart
  label: Camera Tracking Start
  kind: action
  command: "xcommand cameratrackingstart"
  params: []

- id: cameratrackingstop
  label: Camera Tracking Stop
  kind: action
  command: "xcommand cameratrackingstop"
  params: []

- id: cameraupgrade
  label: Camera Upgrade
  kind: action
  command: "xcommand cameraupgrade camera:{camera} {filename}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)
    - name: filename
      type: string
      description: Firmware filename

- id: camerawhitebalance
  label: Camera White Balance
  kind: action
  command: "xcommand camerawhitebalance camera:{camera}"
  params:
    - name: camera
      type: integer
      description: Camera 1-13 (required)

- id: chairrelease
  label: Chair Release
  kind: action
  command: "xcommand chairrelease"
  params: []

- id: chairtake
  label: Chair Take
  kind: action
  command: "xcommand chairtake"
  params: []

- id: conferencedisconnect
  label: Conference Disconnect
  kind: action
  command: "xcommand ConferenceDisconnect"
  params: []

- id: conferenceterminate
  label: Conference Terminate
  kind: action
  command: "xcommand ConferenceTerminate"
  params: []

- id: corpdirsearch
  label: Corporate Directory Search
  kind: action
  command: "xcommand corpdirsearch path:{path} query:{query} startswith:{startswith} hits:{hits} subfolders:{subfolders}"
  params:
    - name: path
      type: string
    - name: query
      type: string
    - name: startswith
      type: string
    - name: hits
      type: integer
      description: 1-40
    - name: subfolders
      type: enum
      values: [On, Off]

- id: corpdirgetnext
  label: Corporate Directory Get Next
  kind: action
  command: "xcommand corpdirgetnext path:{path} query:{query} startswith:{startswith} hits:{hits} id:{id} subfolders:{subfolders}"
  params:
    - name: path
      type: string
    - name: query
      type: string
    - name: startswith
      type: string
    - name: hits
      type: integer
      description: 1-40
    - name: id
      type: string
    - name: subfolders
      type: enum
      values: [On, Off]

- id: corpdirgetprevious
  label: Corporate Directory Get Previous
  kind: action
  command: "xcommand corpdirgetprevious path:{path} query:{query} startswith:{startswith} hits:{hits} id:{id} subfolders:{subfolders}"
  params:
    - name: path
      type: string
    - name: query
      type: string
    - name: startswith
      type: string
    - name: hits
      type: integer
      description: 1-40
    - name: id
      type: string
    - name: subfolders
      type: enum
      values: [On, Off]

- id: defaultvaluesset
  label: Default Values Set
  kind: action
  command: "xcommand defaultvaluesset level:{level}"
  params:
    - name: level
      type: integer
      description: 1-3

- id: dial
  label: Dial
  kind: action
  command: "xcommand dial number:{number} callrate:{callrate} restrict:{restrict}"
  params:
    - name: number
      type: string
      description: Dial string 0-60 chars (required)
    - name: secondnumber
      type: string
      description: 0-60 chars
    - name: subaddress
      type: string
      description: 0-20 chars
    - name: callrate
      type: enum
      values: [Tlph, 1xh221, 2xh221, "64", "128", "192", "256", "320", "384", "512", "768", "1152", "1472", "1920", "2560", "3072", "4096", Max, Auto]
    - name: restrict
      type: enum
      values: [On, Off]
    - name: netprofile
      type: integer
      description: 1-7
    - name: billingcode
      type: string
      description: 0-16 chars

- id: dialglobalentry
  label: Dial Global Entry
  kind: action
  command: "xcommand dialglobalentry globalentryid:{globalentryid}"
  params:
    - name: globalentryid
      type: integer
      description: 1-400 (required)

- id: dialgroupentry
  label: Dial Group Entry
  kind: action
  command: "xcommand dialgroupentry groupentryid:{groupentryid}"
  params:
    - name: groupentryid
      type: integer
      description: 1-50 (required)

- id: diallocalentry
  label: Dial Local Entry
  kind: action
  command: "xcommand diallocalentry localentryid:{localentryid}"
  params:
    - name: localentryid
      type: integer
      description: 1-200 (required)

- id: disconnectcall
  label: Disconnect Call
  kind: action
  command: "xcommand disconnectcall call:{call}"
  params:
    - name: call
      type: integer
      description: Call number 1-11 (omit to disconnect all)

- id: duovideostart
  label: DuoVideo Start
  kind: action
  command: "xcommand duovideostart videosource:{videosource}"
  params:
    - name: videosource
      type: integer
      description: 1-6

- id: duovideostop
  label: DuoVideo Stop
  kind: action
  command: "xcommand duovideostop"
  params: []

- id: dtmfsend
  label: DTMF Send
  kind: action
  command: "xcommand dtmfsend value:{value}"
  params:
    - name: value
      type: string
      description: Single E164 char (required)

- id: feccfocus
  label: FECC Focus
  kind: action
  command: "xcommand feccfocus value:{value}"
  params:
    - name: value
      type: enum
      values: ["+", "-"]
      description: Required

- id: feccmove
  label: FECC Move
  kind: action
  command: "xcommand feccmove direction:{direction}"
  params:
    - name: direction
      type: enum
      values: [Up, Down, Right, Left, In, Out, FocusIn, FocusOut]
      description: Required

- id: feccpresetactivate
  label: FECC Preset Activate
  kind: action
  command: "xcommand feccpresetactivate number:{number}"
  params:
    - name: number
      type: integer
      description: 0-15 (required)

- id: feccpresetstore
  label: FECC Preset Store
  kind: action
  command: "xcommand feccpresetstore number:{number}"
  params:
    - name: number
      type: integer
      description: 0-15 (required)

- id: feccrequeststill
  label: FECC Request Still
  kind: action
  command: "xcommand feccrequeststill source:{source}"
  params:
    - name: source
      type: integer
      description: 0-15 (required)

- id: feccselectsource
  label: FECC Select Source
  kind: action
  command: "xcommand feccselectsource source:{source}"
  params:
    - name: source
      type: integer
      description: 0-15 (required)

- id: feedbackderegister
  label: Feedback Deregister
  kind: action
  command: "xcommand feedbackderegister id:{id}"
  params:
    - name: id
      type: integer
      description: Feedback ID 1-3

- id: feedbackregister
  label: Register Feedback
  kind: action
  command: "xcommand feedbackregister url:{url} expression.1:{expression}"
  params:
    - name: id
      type: integer
      description: Feedback ID 1-3
    - name: url
      type: string
      description: Feedback target URL 0-256 chars (required)
    - name: expression
      type: string
      description: XPath expression(s) to monitor; up to 15 via expression.1..15

- id: fipsmode
  label: FIPS Mode
  kind: action
  command: "xcommand fipsmode mode:{mode}"
  params:
    - name: mode
      type: enum
      values: [On, Off]
      description: Required

- id: floorrelease
  label: Floor Release
  kind: action
  command: "xcommand floorrelease"
  params: []

- id: floorrequest
  label: Floor Request
  kind: action
  command: "xcommand floorrequest"
  params: []

- id: floortosite
  label: Floor To Site
  kind: action
  command: "xcommand floortosite mcuid:{mcuid} terminalid:{terminalid}"
  params:
    - name: mcuid
      type: integer
      description: 1-191 (required)
    - name: terminalid
      type: integer
      description: 1-191 (required)

- id: floortositeend
  label: Floor To Site End
  kind: action
  command: "xcommand floortositeend"
  params: []

- id: groupentryadd
  label: Group Entry Add
  kind: action
  command: "xcommand groupentryadd name:{name} localentryid.1:{localentryid}"
  params:
    - name: name
      type: string
    - name: localentryid
      type: integer
      description: Up to 10 entries via localentryid.1..10, each 1-200

- id: groupentrydelete
  label: Group Entry Delete
  kind: action
  command: "xcommand groupentrydelete groupentryid:{groupentryid}"
  params:
    - name: groupentryid
      type: integer
      description: 1-50 (required)

- id: keydown
  label: Key Down
  kind: action
  command: "xcommand keydown key:{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", Connect, Disconnect, Up, Down, Right, Left, Selfview, Layout, Phonebook, Cancel, MicOff, Presentation, VolumeUp, VolumeDown, OK, ZoomIn, ZoomOut, Grab]
      description: Required

- id: keyrelease
  label: Key Release
  kind: action
  command: "xcommand keyrelease key:{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", Connect, Disconnect, Up, Down, Right, Left, Selfview, Layout, Phonebook, Cancel, MicOff, Presentation, VolumeUp, VolumeDown, OK, ZoomIn, ZoomOut, Grab]
      description: Required

- id: keypress
  label: Key Press
  kind: action
  command: "xcommand keypress key:{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", Connect, Disconnect, Up, Down, Right, Left, Selfview, Layout, Phonebook, Cancel, MicOff, Presentation, VolumeUp, VolumeDown, OK, ZoomIn, ZoomOut, Grab]
      description: Required

- id: keydisable
  label: Key Disable
  kind: action
  command: "xcommand keydisable key:{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", Connect, Disconnect, Up, Down, Right, Left, Selfview, Layout, Phonebook, Cancel, MicOff, Presentation, VolumeUp, VolumeDown, OK, ZoomIn, ZoomOut, Grab]
      description: Required

- id: keyenable
  label: Key Enable
  kind: action
  command: "xcommand keyenable key:{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", Connect, Disconnect, Up, Down, Right, Left, Selfview, Layout, Phonebook, Cancel, MicOff, Presentation, VolumeUp, VolumeDown, OK, ZoomIn, ZoomOut, Grab]
      description: Required

- id: localentryadd
  label: Local Entry Add
  kind: action
  command: "xcommand localentryadd name:{name} number:{number}"
  params:
    - name: name
      type: string
    - name: number
      type: string
    - name: secondnumber
      type: string
    - name: subaddress
      type: string
    - name: callrate
      type: enum
      values: [Tlph, 1xh221, 2xh221, "64", "128", "192", "256", "320", "384", "512", "768", "1152", "1472", "1920", "2560", "3072", "4096", Max, Auto]
    - name: restrict
      type: enum
      values: [On, Off]
    - name: netprofile
      type: integer
      description: 1-7

- id: localentrydelete
  label: Local Entry Delete
  kind: action
  command: "xcommand localentrydelete localentryid:{localentryid}"
  params:
    - name: localentryid
      type: integer
      description: 1-200 (required)

- id: messageboxdelete
  label: Message Box Delete
  kind: action
  command: "xcommand messageboxdelete"
  params: []

- id: messageboxdisplay
  label: Message Box Display
  kind: action
  command: "xcommand messageboxdisplay title:{title} line.1:{line} key.1:{key}"
  params:
    - name: title
      type: string
      description: 0-40 chars (required)
    - name: line
      type: string
      description: Up to 3 lines via line.1..3, each 0-40 chars
    - name: key
      type: string
      description: Up to 3 keys via key.1..3, each 0-15 chars

- id: piphide
  label: PIP Hide
  kind: action
  command: "xcommand piphide virtualmonitor:{virtualmonitor}"
  params:
    - name: virtualmonitor
      type: integer
      description: 1-4 (required)

- id: pipshow
  label: PIP Show
  kind: action
  command: "xcommand pipshow virtualmonitor:{virtualmonitor} picture:{picture} call:{call} position:{position}"
  params:
    - name: virtualmonitor
      type: integer
      description: 1-4 (required)
    - name: picture
      type: enum
      values: [LocalMain, LocalDuo, RemoteMain, RemoteDuo, JPEG, TandbergMonitor1, TandbergMonitor2, None]
      description: Required
    - name: call
      type: integer
      description: 1-11
    - name: position
      type: enum
      values: [BottomLeft, BottomRight, TopLeft, TopRight]

- id: presetactivate
  label: Preset Activate
  kind: action
  command: "xcommand presetactivate number:{number}"
  params:
    - name: number
      type: integer
      description: Preset 0-14 (required)

- id: presetclear
  label: Preset Clear
  kind: action
  command: "xcommand presetclear number:{number}"
  params:
    - name: number
      type: integer
      description: 0-14 (required)

- id: presetstore
  label: Preset Store
  kind: action
  command: "xcommand presetstore number:{number}"
  params:
    - name: number
      type: integer
      description: 0-14 (required)

- id: profileactivate
  label: Profile Activate
  kind: action
  command: "xcommand profileactivate name:{name}"
  params:
    - name: name
      type: string
      description: 0-16 chars (required)

- id: profilecreate
  label: Profile Create
  kind: action
  command: "xcommand profilecreate name:{name}"
  params:
    - name: name
      type: string
      description: 0-16 chars (required)

- id: profiledelete
  label: Profile Delete
  kind: action
  command: "xcommand profiledelete name:{name}"
  params:
    - name: name
      type: string
      description: 0-16 chars (required)

- id: profilelist
  label: Profile List
  kind: query
  command: "xcommand profilelist"
  params: []

- id: screensaveractivate
  label: Screensaver Activate
  kind: action
  command: "xcommand screensaveractivate"
  params: []

- id: screensaverdeactivate
  label: Screensaver Deactivate
  kind: action
  command: "xcommand screensaverdeactivate"
  params: []

- id: screensaverreset
  label: Screensaver Reset
  kind: action
  command: "xcommand screensaverreset delay:{delay}"
  params:
    - name: delay
      type: integer
      description: 1-480 (required)

- id: sitedisconnect
  label: Site Disconnect
  kind: action
  command: "xcommand sitedisconnect mcuid:{mcuid} terminalid:{terminalid}"
  params:
    - name: mcuid
      type: integer
      description: 1-191 (required)
    - name: terminalid
      type: integer
      description: 1-191 (required)

- id: siteview
  label: Site View
  kind: action
  command: "xcommand siteview mcuid:{mcuid} terminalid:{terminalid}"
  params:
    - name: mcuid
      type: integer
      description: 1-191 (required)
    - name: terminalid
      type: integer
      description: 1-191 (required)

- id: siteviewend
  label: Site View End
  kind: action
  command: "xcommand siteviewend"
  params: []

- id: spidautoconfigure
  label: SPID Auto Configure
  kind: action
  command: "xcommand spidautoconfigure"
  params: []

- id: stillimagesend
  label: Still Image Send
  kind: action
  command: "xcommand stillimagesend videosource:{videosource}"
  params:
    - name: videosource
      type: integer
      description: 1-6

- id: streamingstart
  label: Streaming Start
  kind: action
  command: "xcommand streamingstart"
  params: []

- id: streamingstop
  label: Streaming Stop
  kind: action
  command: "xcommand streamingstop"
  params: []

- id: textdelete
  label: Text Delete
  kind: action
  command: "xcommand textdelete layer:{layer}"
  params:
    - name: layer
      type: integer
      description: 1-3 (required)

- id: textdisplay
  label: Text Display
  kind: action
  command: "xcommand textdisplay layer:{layer} text:{text} timeout:{timeout}"
  params:
    - name: layer
      type: integer
      description: 1-3 (required)
    - name: text
      type: string
      description: 0-38 chars
    - name: timeout
      type: integer
      description: 0-999

- id: virtualmonitorreset
  label: Virtual Monitor Reset
  kind: action
  command: "xcommand virtualmonitorreset virtualmonitor:{virtualmonitor}"
  params:
    - name: virtualmonitor
      type: integer
      description: 1-4 (required)

- id: virtualmonitorset
  label: Virtual Monitor Set
  kind: action
  command: "xcommand virtualmonitorset virtualmonitor:{virtualmonitor} picture:{picture} call:{call}"
  params:
    - name: virtualmonitor
      type: integer
      description: Monitor 1-4 (required)
    - name: picture
      type: enum
      values: [LocalMain, LocalDuo, Still, RemoteMain, RemoteDuo, JPEG, TandbergMonitor1, TandbergMonitor2, PictureProgram1, PictureProgram2, PictureProgram3, PictureProgram4, None]
      description: Required
    - name: call
      type: integer
      description: Call 1-11

# --- Extcam protocol commands (external camera control) ---

- id: extcap
  label: Extcam Capabilities
  kind: query
  command: "xcommand extcap"
  params: []
  notes: Lists external camera capabilities

- id: extname
  label: Extcam Name
  kind: query
  command: "xcommand extname"
  params: []
  notes: Queries external camera name

- id: extswitch
  label: Extcam Switch Source
  kind: action
  command: "xcommand extswitch source:{source}"
  params:
    - name: source
      type: integer
      description: 1-5

# --- xStatus / xConfiguration / xHistory query surfaces ---

- id: xstatus
  label: xStatus Query
  kind: query
  command: "xstatus {path}"
  params:
    - name: path
      type: string
      description: Status path (e.g. call 1, ip, systemunit). Omit for full tree.
  notes: Returns `*s` prefixed status blocks

- id: xconfiguration_read
  label: xConfiguration Read
  kind: query
  command: "xconfiguration {path}"
  params:
    - name: path
      type: string
      description: Config path (e.g. serialport 1 baudrate). Omit for full tree.
  notes: Returns `*c` prefixed config; writing uses same prefix without `*c`

- id: xhistory
  label: xHistory Query
  kind: query
  command: "xhistory"
  params: []
  notes: Returns `*l` prefixed call history

- id: xgetxml
  label: xGetXML Query
  kind: query
  command: "xgetxml {location}"
  params:
    - name: location
      type: string
      description: XPath location (e.g. status/ip)
  notes: XML-formatted status/configuration data

- id: xfeedback_register
  label: xFeedback Register (XPath)
  kind: action
  command: "xfeedback register {expression}"
  params:
    - name: expression
      type: string
      description: XPath expression (e.g. status/call, event/callsuccessful)
  notes: Up to 20 registrations total, 15 per session

- id: xfeedback_deregister
  label: xFeedback Deregister
  kind: action
  command: "xfeedback deregister {index}"
  params:
    - name: index
      type: integer
      description: Registration index

- id: xfeedback_list
  label: xFeedback List
  kind: query
  command: "xfeedback list"
  params: []

# --- TXAS HTTP endpoints ---

- id: txas_getxml
  label: TXAS getxml (HTTP GET)
  kind: query
  command: "GET /getxml?location={location}"
  params:
    - name: location
      type: string
      description: XPath expression
  notes: HTTP/HTTPS on port 80; returns XML

- id: txas_formputxml
  label: TXAS formputxml (HTTP POST)
  kind: action
  command: "POST /formputxml  body: xmldoc={xmldoc}"
  params:
    - name: xmldoc
      type: string
      description: XML document (form-encoded)

- id: txas_putxml
  label: TXAS putxml (HTTP POST raw XML)
  kind: action
  command: "POST /putxml  Content-Type: text/xml  body: {xmldoc}"
  params:
    - name: xmldoc
      type: string
      description: Raw XML body
```

## Feedbacks
```yaml
# Response/status shapes from source xStatus + xEvent surfaces.

- id: call_status
  type: enum
  values: [Disconnected, CallIDLE, Dialing, Alerting, Proceeding, EstablOut, EstablIn, AwaitInCnf, Connected, Disconnecting, Await2ndnr, ClearOut, ClearIn, Syncing, Capex, Synced, Unframed]
  description: Call connection state per Call [1..10]

- id: call_info
  type: object
  fields:
    - name: callrate
      type: integer
    - name: duration
      type: integer
    - name: direction
      type: enum
      values: [Incoming, Outgoing]
    - name: protocol
      type: enum
      values: [ISDN, H320, H323, SIP]
    - name: type
      type: enum
      values: [NA, Tlph, Vtlph]
    - name: mute
      type: enum
      values: [On, Off]
    - name: remoteNumber
      type: string
    - name: incomingNumber
      type: string

- id: conference_status
  type: object
  fields:
    - name: type
      type: enum
      values: [Idle, PointToPoint, PointToMultiSite, MultiSite]
    - name: calls
      type: array
      description: CallRef [1..11]
    - name: duovideo_status
      type: enum
      values: [None, Ready, On]

- id: camera_status
  type: object
  fields:
    - name: powered
      type: boolean
    - name: mirror
      type: enum
      values: [On, Off]
    - name: brightness_level
      type: integer
    - name: whitebalance_mode
      type: enum
      values: [Auto, Manual]
    - name: focus_mode
      type: enum
      values: [Auto, Manual]
    - name: focus_position
      type: integer
    - name: pan_position
      type: integer
    - name: tilt_position
      type: integer
    - name: zoom_position
      type: integer

- id: h323gatekeeper_status
  type: enum
  values: [Rejected, Undefined, Discovering, Require, Pending, Confirmed]

- id: sip_status
  type: enum
  values: [Disabled, Register, Subscribe, Require, Pending, Confirmed]

- id: ntp_status
  type: enum
  values: [Disabled, Offline, Online]

- id: remoteswupgrade_status
  type: enum
  values: [Off, Upgrading]

# UNRESOLVED: full xStatus tree (BRI/PRI/ICE/Ethernet/IP sub-blocks) not reproduced verbatim
```

## Variables
```yaml
# xConfiguration read/write parameters. Representative high-level entries from source;
# full enumeration in source Configuration Reference. Write syntax:
#   xconfiguration <path> <value>
# Read returns `*c` prefixed lines.

- id: audio_volume
  path: Audio Volume
  type: integer
  range: [0, 21]

- id: audio_microphones_mode
  path: Audio Microphones Mode
  type: enum
  values: [On, Off]

- id: audio_automute
  path: Audio AutoMute
  type: enum
  values: [On, Off, Unmute]

- id: serialport_baudrate
  path: SerialPort {n} BaudRate
  type: enum
  values: ["1200", "2400", "4800", "9600", "19200", "38400", "57600", "115200"]

- id: serialport_mode
  path: SerialPort 1 Mode
  type: enum
  values: [Control, Transparent, Direct, Off]

- id: telnet_mode
  path: Telnet Mode
  type: enum
  values: [On, Off]

- id: telnetchallenge_mode
  path: TelnetChallenge Mode
  type: enum
  values: [On, Off]

- id: telnetchallenge_port
  path: TelnetChallenge Port
  type: enum
  values: ["23", "57"]

- id: http_mode
  path: HTTP Mode
  type: enum
  values: [On, Off]

- id: https_mode
  path: HTTPS Mode
  type: enum
  values: [On, Off]

- id: camera_brightness_level
  path: Camera {n} Brightness Level
  type: integer
  range: [0, 31]

- id: camera_whitebalance_mode
  path: Camera {n} Whitebalance Mode
  type: enum
  values: [Auto, Manual, Indoor, Outdoor, Gain]

- id: conference_defaultcall_callrate
  path: Conference DefaultCall CallRate
  type: enum
  values: [Tlph, 1xh221, 2xh221, "64", "128", "192", "256", "320", "384", H0, "512", "768", "1152", "1472", "1920", "2560", "3072", "4096", Max, Auto]

- id: conference_encryption_mode
  path: Conference Encryption Mode
  type: enum
  values: [On, Off, Auto]

- id: security_level
  path: Security Level
  type: integer
  range: [0, 2]

- id: maxbandwidth
  path: MaxBandwidth
  type: integer
  range: [128, 6144]

- id: mainvideosource
  path: MainVideoSource
  type: integer
  range: [1, 6]

- id: switch_source
  path: Switch Source
  type: integer
  range: [1, 6]

# UNRESOLVED: full xConfiguration tree (ISDN/PRI/SIP/H323/QoS/OSD/Preset/Video/etc.)
# spans 300+ rows in source; only representative entries shown. See source §Configuration Reference.
```

## Events
```yaml
# xEvent responses from source (`*e` prefix). Subscribe via xfeedback register event/<name>.

- id: callsuccessful
  description: Call completed successfully
  fields:
    - name: logTag
    - name: protocol
      type: enum
      values: [H323, H320, SIP]
    - name: direction
      type: enum
      values: [Incoming, Outgoing]
    - name: callRate
    - name: encryptionIncoming
      type: enum
      values: [On, Off]
    - name: encryptionOutgoing
      type: enum
      values: [On, Off]

- id: calldisconnected
  description: Call ended
  fields:
    - name: logTag
    - name: cause

- id: authenticationfailure
  description: Auth failed
  fields:
    - name: logTag
    - name: reason

- id: messageboxresult
  description: Message box interaction
  fields:
    - name: logTag
    - name: value

- id: downspeedingfinished
  description: Automatic bitrate reduction completed
  fields:
    - name: logTag

- id: packetlossdownspeed
  description: Packet loss triggered downspeed
  fields:
    - name: logTag

- id: sstring
  description: S-string notification
  fields:
    - name: text

- id: systemactivity
  description: System activity notification
  fields:
    - name: text
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- XACLI prompt format: `xcommand`, `xconfiguration`, `xstatus`, `xhistory`, `xevent`
- Response prefixes: `*c` (config), `*s` (status), `*l` (history), `*e` (event), `*r` (result OK)
- XML API (TXAS): `/getxml?location=<XPath>` (GET), `/putxml` (raw XML POST), `/formputxml` (form POST)
- Up to 20 XPath feedback registrations total, 15 per session
- Serial port: 9-pin female D-sub, configured as DCE; straight-through cable required
- TelnetChallenge: optional MD5 encrypted challenge on connect (port 23 or 57); 8 simultaneous Telnet sessions
- Camera control via Extcam protocol: extcap, extname, extswitch, feccmove, feccfocus, feccpresetactivate/store, feccselectsource, feccrequeststill
- Six video input sources (1-6); two TV outputs + two DVI outputs; four virtual monitors
- Session preferences via `xpreferences` (xpathwrite, detaillevel, xmlcommandresult, xmlconfigfeedback, xmlstatusfeedback, itemnumber, completepath)
- Model variants: 3000 MXP (BRI/External ISDN), 6000 MXP (BRI/PRI/External/G703); H.320 NetType differs

<!-- UNRESOLVED: firmware version not stated in source; some config options vary by MXP model variant (3000 vs 6000); HTTP/HTTPS authentication mechanism not specified; FIPSMode impact on auth flow not detailed -->
````

**Upgrade summary:**
- Actions: 9 → ~85 (full xCommand enumeration + Extcam + xStatus/xConfiguration/xHistory/xFeedback + TXAS HTTP endpoints)
- Added `command:` payloads to all actions (verifier requires literal payload)
- Traits: promoted from comments to actual `traits:` values
- Feedbacks: added conference/camera/gatekeeper/SIP/NTP/upgrade statuses
- Variables: added representative xConfiguration entries with write-path syntax
- Events: added `sstring` + `systemactivity` (in source, were missing)
- Preserved existing IDs/shapes (incl. legacy `cameratype` id with note)

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - manualsdir.com
  - manualmachine.com
  - stone-oakvalley-studios.com
source_urls:
  - https://usermanual.wiki/Document/tandbergmxpreferenceuserguideforsystemintegratorsf8.1653454696.pdf
  - https://usermanual.wiki/TANDBERG/MXP.3726017066.pdf
  - https://www.manualsdir.com/manuals/213271/tandberg-mxp.html
  - https://manualmachine.com/tandberg/mxp/464245-user-manual/
  - https://www.stone-oakvalley-studios.com/uploads/000926092022233802/mxp_reference_user_guide_for_system_integrators.pdf
retrieved_at: 2026-05-18T17:04:01.469Z
last_checked_at: 2026-07-22T01:31:30.368Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:31:30.368Z
matched_actions: 93
action_count: 93
confidence: medium
summary: "All 93 spec actions match source verbatim with correct params; only the xpreferences family remains unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "xpreferences xpathwrite"
- "xpreferences detaillevel"
- "xpreferences xmlcommandresult"
- "xpreferences xmlconfigfeedback"
- "xpreferences xmlstatusfeedback"
- "xpreferences itemnumber"
- "xpreferences completepath"
- "device model variant (3000 vs 6000) not specified in source, some config options differ"
- "full xStatus tree (BRI/PRI/ICE/Ethernet/IP sub-blocks) not reproduced verbatim"
- "full xConfiguration tree (ISDN/PRI/SIP/H323/QoS/OSD/Preset/Video/etc.)"
- "no explicit macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "firmware version not stated in source; some config options vary by MXP model variant (3000 vs 6000); HTTP/HTTPS authentication mechanism not specified; FIPSMode impact on auth flow not detailed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
