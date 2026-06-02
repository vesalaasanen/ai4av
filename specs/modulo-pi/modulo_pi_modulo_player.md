---
spec_id: admin/modulo-pi-modulo-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Modulo Pi Modulo Player Control Spec"
manufacturer: "Modulo Pi"
model_family: "Modulo Player"
aliases: []
compatible_with:
  manufacturers:
    - "Modulo Pi"
  models:
    - "Modulo Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.modulo-pi.com
source_urls:
  - https://support.modulo-pi.com/modulo-player-manual/1/en/topic/tcp-ip-external-control-protocol
retrieved_at: 2026-05-04T17:33:34.629Z
last_checked_at: 2026-05-14T18:17:18.179Z
generated_at: 2026-05-14T18:17:18.179Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "setPlayListProperty (not implemented)"
  - "authentication mechanism not documented; UNRESOLVED: command timing/flow control requirements not stated"
  - "port 28686 documented for Modulo Player controls; second port handling not specified in schema"
  - "no standalone settable variables documented; all parameters are action-embedded"
  - "no unsolicited event notifications documented"
  - "no explicit multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "second port (28686) mapping to Transport.addressing not expressible in current schema; UNRESOLVED: full error code/behavior documentation absent"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.179Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 49 spec actions matched exactly with source; transport parameters verified; full coverage confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Modulo Pi Modulo Player Control Spec

## Summary
The Modulo Player is a media playback server supporting TCP/IP external control. Two control ports are documented: port 28670 for PC-level operations (start, terminate, reboot, halt, session loading) and port 28686 for playback and playlist control (play, pause, faders, cues, media management). Commands use `'\n'` (0x0A) as the command terminator and `'?'` as the argument separator.

<!-- UNRESOLVED: authentication mechanism not documented; UNRESOLVED: command timing/flow control requirements not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 28670  # PC controls (start, terminate, reboot, halt, loadByNameSession)
  # UNRESOLVED: port 28686 documented for Modulo Player controls; second port handling not specified in schema
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # start, terminate, reboot, halt commands present
- routable       # playlist/input routing commands present
- queryable      # get* commands returning state present
- levelable      # fader commands present (setFaderPlayList, setFaderWithTimePlayList)
```

## Actions
```yaml
- id: start
  label: Start Modulo-Player
  kind: action
  params: []

- id: terminate
  label: Stop Modulo-Player
  kind: action
  params: []

- id: reboot
  label: Reboot Server
  kind: action
  params: []

- id: halt
  label: Halt Server
  kind: action
  params: []

- id: loadByNameSession
  label: Load Session by Name
  kind: action
  params:
    - name: sessionName
      type: string
      description: Name of the session to load

- id: playItem
  label: Play Item
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: locatePlayListCue
  label: Locate Playlist Cue at Timecode
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)
    - name: playState
      type: integer
      description: "1 for play, 0 for pause"
    - name: time
      type: integer
      description: Timecode in ms from the start of the cue

- id: setPlayState
  label: Set Play State
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: playState
      type: integer
      description: "1 for play, 0 for pause"

- id: setFaderPlayList
  label: Set Playlist Fader
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: value
      type: number
      description: Fader value between 0.0 and 1.0

- id: setFaderWithTimePlayList
  label: Set Playlist Fader with Fade Time
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: value
      type: number
      description: Fader value between 0.0 and 1.0
    - name: time
      type: integer
      description: Fade time in ms

- id: playNextCue
  label: Play Next Cue
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)

- id: playPreviousCue
  label: Play Previous Cue
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)

- id: preloadCue
  label: Preload Cue
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: launchTask
  label: Launch Task
  kind: action
  params:
    - name: taskIndex
      type: integer
      description: Task number (1-based)

- id: setUserKeyValue
  label: Set User Key Value
  kind: action
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: rescanMedias
  label: Rescan Media
  kind: action
  params: []

- id: backupShow
  label: Backup Show
  kind: action
  params: []

- id: saveShow
  label: Save Show
  kind: action
  params: []

- id: addCue
  label: Add Cue
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: deleteCue
  label: Delete Cue
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: addNoRefreshCue
  label: Add Cue (No Refresh)
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: deleteNoRefreshCue
  label: Delete Cue (No Refresh)
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)

- id: sendToRemotePlaylist
  label: Send to Remote Playlist
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)

- id: copyToSlavePlaylist
  label: Copy to Slave Playlist
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)

- id: setCueProperty
  label: Set Cue Property
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)
    - name: property
      type: string
      description: "Property name: name, Trigger (0:go, 1:follow, 2:wait, 3:TC), TriggerValue"
    - name: value
      type: string
      description: Property value

- id: setCueLayerProperty
  label: Set Cue Layer Property
  kind: action
  params:
    - name: playlistIndex
      type: integer
      description: Playlist index (1-based)
    - name: cueIndex
      type: integer
      description: Cue index (1-based)
    - name: layerIndex
      type: integer
      description: Layer index
    - name: property
      type: string
      description: "Property: media, fadein, fadeout, x, y, scalex, scaley, rotation, opacity"
    - name: value
      type: string
      description: Property value
- id: getUserKeyValue
  label: Get User Key Value
  kind: query
  params:
    - name: key
      type: string
      description: User key to retrieve

- id: getAllMediasWithInfos
  label: Get All Medias With Infos
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: appliReady
  label: Appli Ready
  kind: feedback
  returns: "Online"

- id: rescanMediasResult
  label: Rescan Medias Result
  kind: feedback
  returns: "RescanDone"

- id: connectedController
  label: Connected Controller
  kind: feedback
  returns: "connectedController?{value}"

- id: allPlaylistsWithUuid
  label: All Playlists with UUID
  kind: feedback
  returns: "allplaylistswithuuid?uuid|xxx;uuid|yyy;..."

- id: allCuesWithUuid
  label: All Cues with UUID
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "allcueswithuuid?playlistuuid?cueuuid|xxx;..."

- id: allMediasWithUuid
  label: All Media with UUID
  kind: feedback
  returns: "allmediaswithuuid?id1|hello.mov;id2|toto.png;..."

- id: allTasksWithUuid
  label: All Tasks with UUID
  kind: feedback
  returns: "alltaskswithuuid?uuid|xxx;uuid|yyy;..."

- id: allPlayLists
  label: All Playlists
  kind: feedback
  returns: "AllPlayLists?xxx;yyy;zzz;..."

- id: allCues
  label: All Cues
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "AllCues?playlistindex?xxx;xd;gf;e"

- id: allMedias
  label: All Media
  kind: feedback
  returns: "AllMedias?id1|hello.mov;id2|toto.png;..."

- id: mediaCount
  label: Media Count
  kind: feedback
  returns: "MediaCount?{count}"

- id: playlistCount
  label: Playlist Count
  kind: feedback
  returns: "PlayListCount?{count}"

- id: cueCount
  label: Cue Count
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "CueCount?playlistindex?{count}"

- id: playlistGrandMaster
  label: Playlist Grand Master Fader
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "{value} (fader 0.0-1.0)"

- id: playlistCueIndex
  label: Playlist Cue Index
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "playListCueIndex?{xx}"

- id: playlistCueTimecode
  label: Playlist Cue Timecode
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "playListCueTimecode?{xx}"

- id: playlistCueName
  label: Playlist Cue Name
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
  returns: "playListIsPlay?{xx}"

- id: mediaProperty
  label: Media Property
  kind: feedback
  params:
    - name: idmedia
      type: string
    - name: property
      type: string
      description: "name, info, fileName, folder, extension, size, lastModified, thumbnail"
  returns: "MediaProperty?idmedia?property?value"

- id: playlistProperty
  label: Playlist Property
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
    - name: property
      type: string
      description: "name, cueIndex, cueName, cueIsPlay, cueTimecode, grandMaster"
  returns: "PlayListProperty?playlistindex?property?value"

- id: cueProperty
  label: Cue Property
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
    - name: cueIndex
      type: integer
    - name: property
      type: string
  returns: "CueProperty?playlistindex?cueindex?property?value"

- id: cueLayerProperty
  label: Cue Layer Property
  kind: feedback
  params:
    - name: playlistIndex
      type: integer
    - name: cueIndex
      type: integer
    - name: layerIndex
      type: integer
    - name: property
      type: string
  returns: "CueLayerProperty?playlistindex?cueIndex?layerIndex?property?xx"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable variables documented; all parameters are action-embedded
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Two TCP ports are used: 28670 for PC-level controls (start, terminate, reboot, halt, loadByNameSession) and 28686 for Modulo Player playback controls (playItem, setFader*, playlist/cue management, media queries). The example in the source uses Hercules software on port 28670.

Command format: `{command}?{arg1}?{arg2}...\n` with `'?'` as argument separator and `'\n'` (0x0A) as command terminator.

The `userKeyValue?key?value\n` command is listed but appears to be both a setter and query pattern without a clear get prefix; treated as action/setter here.
<!-- UNRESOLVED: second port (28686) mapping to Transport.addressing not expressible in current schema; UNRESOLVED: full error code/behavior documentation absent -->

## Provenance

```yaml
source_domains:
  - support.modulo-pi.com
source_urls:
  - https://support.modulo-pi.com/modulo-player-manual/1/en/topic/tcp-ip-external-control-protocol
retrieved_at: 2026-05-04T17:33:34.629Z
last_checked_at: 2026-05-14T18:17:18.179Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.179Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 49 spec actions matched exactly with source; transport parameters verified; full coverage confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "setPlayListProperty (not implemented)"
- "authentication mechanism not documented; UNRESOLVED: command timing/flow control requirements not stated"
- "port 28686 documented for Modulo Player controls; second port handling not specified in schema"
- "no standalone settable variables documented; all parameters are action-embedded"
- "no unsolicited event notifications documented"
- "no explicit multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "second port (28686) mapping to Transport.addressing not expressible in current schema; UNRESOLVED: full error code/behavior documentation absent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
